import React from "react";

export default function RoleSelector({ formData, setFormData }) {
  return (
    <div className="flex gap-4 mb-5">
      <button
        type="button"
        onClick={() =>
          setFormData({
            ...formData,
            role: "buyer",
          })
        }
        className={`flex-1 px-4 py-2 rounded ${
          formData.role === "buyer" ? "bg-blue-700 text-white" : "bg-gray-300"
        }`}
      >
        Buyer
      </button>

      <button
        type="button"
        onClick={() =>
          setFormData({
            ...formData,
            role: "seller",
          })
        }
        className={`flex-1 px-4 py-2 rounded ${
          formData.role === "seller" ? "bg-green-700 text-white" : "bg-gray-300"
        }`}
      >
        Seller
      </button>
    </div>
  );
}
