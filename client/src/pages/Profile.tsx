import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import type { RootState, AppDispatch } from "../redux/store";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  type User,
} from "../redux/user/userSlice";

interface ProfileFormData {
  username?: string;
  email?: string;
  password?: string;
  avatar?: string;
  [key: string]: any;
}

export default function Profile(): React.JSX.Element {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<ProfileFormData>({});
  const { currentUser, loading, error } = useSelector(
    (state: RootState) => state.user,
  );

  // states for handlefileupload to cloudinary + backend.
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadImageSuccess, setUploadImageSuccess] = useState<boolean>(false);

  // states for file upload to cloudinary
  const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const uploadData = new FormData();

    uploadData.append("file", file);
    uploadData.append("upload_preset", "plottrade");

    const response = await axios.post(
      import.meta.env.VITE_CLOUDINARY_URL,
      uploadData,
      {
        onUploadProgress: (event) => {
          if (event.total) {
            const percent = Math.round((event.loaded * 100) / event.total);
            setProgress(percent);
          }
        },
      },
    );

    return response.data.secure_url;
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = e.target.files?.[0];

    if (!file || !currentUser) return;

    setUploadImageSuccess(false);
    setProgress(0);
    setUploading(true);

    try {
      const imageUrl = await uploadToCloudinary(file);

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/update/avatar/${currentUser._id}`,
        {
          avatar: imageUrl,
        },
      );

      setFormData((prev) => ({
        ...prev,
        avatar: imageUrl,
      }));

      //dispatch update user with new avatar
      dispatch(updateUserSuccess({ ...currentUser, avatar: imageUrl }));
      setUploadImageSuccess(true);
    } catch (err: unknown) {
      console.log(err);
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (
    e: React.SubmitEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      dispatch(updateUserStart());
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/update/${currentUser._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data as User));
      setUpdateSuccess(true);
    } catch (err: unknown) {
      const errorObj = err as Error;
      dispatch(updateUserFailure(errorObj.message));
    }
  };

  const handleDeleteUser = async (): Promise<void> => {
    if (!currentUser) return;

    try {
      dispatch(deleteUserStart());
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/delete/${currentUser._id}`,
        {
          method: "DELETE",
        },
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (err: unknown) {
      const errorObj = err as Error;
      dispatch(deleteUserFailure(errorObj.message));
    }
  };

  const handleSignOut = async (): Promise<void> => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/signout`,
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (err: unknown) {
      const errorObj = err as Error;
      dispatch(deleteUserFailure(errorObj.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7 uppercase">
        {currentUser?.role}'s Profile
      </h1>
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
            src={formData.avatar || currentUser?.avatar}
            onClick={() => fileRef.current?.click()}
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
          defaultValue={currentUser?.username}
          id="username"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          defaultValue={currentUser?.email}
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
      <div className="flex flex-col">
        {currentUser?.role === "seller" ? (
          <>
            <Link
              to="/my-listings"
              className="flex-1 bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
            >
              My Listings
            </Link>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
