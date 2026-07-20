import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../redux/store";

interface ListingFormData {
  imageUrls: string[];
  name: string;
  description: string;
  address: string;
  type: string;
  bedrooms: number | string;
  bathrooms: number | string;
  regularPrice: number | string;
  discountPrice: number | string;
  offer: boolean;
  parking: boolean;
  furnished: boolean;
}

export default function CreateListing(): React.JSX.Element {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState<ListingFormData>({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [imageUploadError, setImageUploadError] = useState<string | false>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | false>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const storeImage = async (file: File): Promise<string | null> => {
    if (!file) {
      setImageUploadError("Please select an image.");
      return null;
    }

    if (!file.type.startsWith("image/")) {
      setImageUploadError("Only image files are allowed.");
      return null;
    }

    const MAX_SIZE = 2 * 1024 * 1024; // 2 MB

    if (file.size > MAX_SIZE) {
      setImageUploadError("Image size must be less than 2 MB.");
      return null;
    }

    const uploadFormData = new FormData();
    uploadFormData.append("file", file);
    uploadFormData.append("upload_preset", "plottrade");

    try {
      setImageUploadError(false);

      const response = await axios.post(
        import.meta.env.VITE_CLOUDINARY_URL,
        uploadFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (event) => {
            if (event.total) {
              const progress = Math.round((event.loaded * 100) / event.total);
              console.log(`Upload is ${progress}% done`);
            }
          },
        },
      );

      return response.data.secure_url;
    } catch (err: unknown) {
      const axiosErr = err as AxiosError<{ error?: { message?: string } }>;
      setImageUploadError(
        axiosErr.response?.data?.error?.message || "Image upload failed.",
      );
      return null;
    }
  };

  const handleImageSubmit = async (): Promise<void> => {
    if (files.length === 0) {
      setImageUploadError("Please select at least one image.");
      return;
    }

    if (files.length + formData.imageUrls.length > 6) {
      setImageUploadError("You can only upload 6 images per listing.");
      return;
    }

    try {
      setUploading(true);
      setImageUploadError(false);

      const imageUrls = await Promise.all(
        files.map((file) => storeImage(file)),
      );
      const validImageUrls = imageUrls.filter((url): url is string => url !== null);

      setFormData((prev) => ({
        ...prev,
        imageUrls: [...prev.imageUrls, ...validImageUrls],
      }));
    } catch (err: unknown) {
      const errorObj = err as Error;
      setImageUploadError(errorObj.message);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index: number): void => {
    setFormData((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index),
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { id, value, type } = e.target;

    if (id === "sale" || id === "rent") {
      setFormData((prev) => ({
        ...prev,
        type: id,
      }));
    }

    if (id === "parking" || id === "furnished" || id === "offer") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [id]: checked,
      }));
    }

    if (type === "number" || type === "text" || type === "textarea") {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1) {
        setError("You must upload at least one image");
        return;
      }
      if (+formData.regularPrice < +formData.discountPrice) {
        setError("Discount price must be lower than regular price");
        return;
      }
      setLoading(true);
      setError(false);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/listings/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser?._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
        return;
      }
      navigate(`/listing/${data._id}`);
    } catch (err: unknown) {
      const errorObj = err as Error;
      setError(errorObj.message);
      setLoading(false);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength={62}
            minLength={10}
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="50"
                max="10000000"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className="flex flex-col items-center">
                <p>Regular price</p>
                {formData.type === "rent" && (
                  <span className="text-xs">($ / month)</span>
                )}
              </div>
            </div>
            {formData.offer && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  min="0"
                  max="10000000"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <div className="flex flex-col items-center">
                  <p>Discounted price</p>

                  {formData.type === "rent" && (
                    <span className="text-xs">($ / month)</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files ? Array.from(e.target.files) : [])}
              className="block w-full border rounded p-2
             file:mr-4
             file:rounded
             file:border-0
             file:bg-blue-600
             file:px-4
             file:py-2
             file:text-white
             hover:file:bg-blue-700"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <p className="text-red-700 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between p-3 border items-center"
              >
                <img
                  src={url}
                  alt="listing image"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            disabled={loading || uploading}
            className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Creating..." : "Create listing"}
          </button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
}
