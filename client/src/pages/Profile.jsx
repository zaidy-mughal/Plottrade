import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import axios from "axios";

import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from "../redux/user/userSlice";

import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Profile() {
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const { currentUser, loading, error } = useSelector((state) => state.user);

  // states for handlefileupload to cloudinary + backend.
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadImageSuccess, setUploadImageSuccess] = useState(false);

  // states for file upload to cloudinary
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "plottrade");

    const response = await axios.post(
      import.meta.env.VITE_CLOUDINARY_URL,
      formData,
      {
        onUploadProgress: (event) => {
          const percent = Math.round((event.loaded * 100) / event.total);

          setProgress(percent);
        },
      },
    );

    return response.data.secure_url;
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setUploadImageSuccess(false);
    setProgress(0);
    // Show preview immediately
    // setPreview(URL.createObjectURL(file));
    setUploading(true);

    try {
      const imageUrl = await uploadToCloudinary(file);

      await axios.put(`api/user/update/avatar/${currentUser._id}`, {
        avatar: imageUrl,
      });

      setFormData((prev) => ({
        ...prev,
        avatar: imageUrl,
      }));

      //dispatch update user with new avatar
      dispatch(updateUserSuccess({ ...currentUser, avatar: imageUrl }));
      setUploadImageSuccess(true);

    } catch (err) {
      console.log(err);
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={handleFileChange}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />

        <div className="relative self-center">
          <img
            src={formData.avatar || currentUser.avatar}
            onClick={() => fileRef.current.click()}
            className="h-24 w-24 rounded-full object-cover cursor-pointer"
            alt="profile"
          />

          {uploading && (
            <div className="absolute inset-0 rounded-full bg-black/60 flex items-center justify-center">
              <span className="text-white font-bold">{progress}%</span>
            </div>
          )}
        </div>

        {uploadImageSuccess && (
          <p className="text-green-700 text-center">
            ✓ Image updated successfully!
          </p>
        )}

        <input
          type="text"
          placeholder="username"
          defaultValue={currentUser.username}
          id="username"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          defaultValue={currentUser.email}
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          onChange={handleChange}
          id="password"
          className="border p-3 rounded-lg"
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Update"}
        </button>
        <Link
          className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
          to={"/create-listing"}
        >
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          Delete account
        </span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          Sign out
        </span>
      </div>

      <p className="text-red-700 mt-5">{error ? error : ""}</p>
      <p className="text-green-700 mt-5">
        {updateSuccess ? "User is updated successfully!" : ""}
      </p>
      <button className="text-green-700 w-full">Show Listings</button>
    </div>
  );
}
