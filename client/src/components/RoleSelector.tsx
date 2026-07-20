import React from "react";

export interface RoleFormData {
  role?: string;
  [key: string]: any;
}

// generic type for role selector
export interface RoleSelectorProps<T extends RoleFormData = RoleFormData> {
  formData: T;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
}

export default function RoleSelector<T extends RoleFormData = RoleFormData>({
  formData,
  setFormData,
}: RoleSelectorProps<T>): React.JSX.Element {
  return (
    <div className="flex gap-4 mb-5">
      <button
        type="button"
        onClick={() =>
          setFormData((prev) => ({
            ...prev,
            role: "buyer",
          }))
        }
        className={`flex-1 px-4 py-2 rounded ${formData.role === "buyer" ? "bg-blue-700 text-white" : "bg-gray-300"
          }`}
      >
        Buyer
      </button>

      <button
        type="button"
        onClick={() =>
          setFormData((prev) => ({
            ...prev,
            role: "seller",
          }))
        }
        className={`flex-1 px-4 py-2 rounded ${formData.role === "seller" ? "bg-green-700 text-white" : "bg-gray-300"
          }`}
      >
        Seller
      </button>
    </div>
  );
}
