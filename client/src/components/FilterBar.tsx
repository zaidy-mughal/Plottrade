import React from "react";
import { useNavigate } from "react-router-dom";

export interface SidebarData {
  searchTerm: string;
  type: string;
  parking: boolean;
  furnished: boolean;
  offer: boolean;
  sort: string;
  order: string;
}

export interface FilterBarProps {
  sidebardata: SidebarData;
  setSidebardata: React.Dispatch<React.SetStateAction<SidebarData>>;
  isFilterOpen: boolean;
  setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FilterBar({
  sidebardata,
  setSidebardata,
  isFilterOpen,
  setIsFilterOpen,
}: FilterBarProps) {
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    const type = e.target.type;

    if (id === "all" || id === "rent" || id === "sale") {
      setSidebardata((prev) => ({ ...prev, type: id }));
    } else if (id === "searchTerm") {
      setSidebardata((prev) => ({ ...prev, searchTerm: value }));
    } else if (type === "checkbox") {
      setSidebardata((prev) => ({ ...prev, [id]: checked }));
    } else if (id === "sort_order") {
      const sort = value.split("_")[0] || "createdAt";
      const order = value.split("_")[1] || "desc";
      setSidebardata((prev) => ({ ...prev, sort, order }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    urlParams.set("parking", String(sidebardata.parking));
    urlParams.set("furnished", String(sidebardata.furnished));
    urlParams.set("offer", String(sidebardata.offer));
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    navigate(`${window.location.pathname}?${urlParams.toString()}`);
  };
  return (
    <div className="bg-slate-200 border-b border-slate-200 sticky top-0 z-40 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Main Action Bar */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </span>
              <input
                type="text"
                id="searchTerm"
                placeholder="Search by neighborhood, city, or plot features..."
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-800"
                value={sidebardata.searchTerm}
                onChange={handleChange}
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center gap-2 px-5 py-3 border rounded-xl font-medium text-sm transition-all ${isFilterOpen ? "border-blue-500 bg-blue-50 text-blue-600" : "border-slate-200 text-slate-700 hover:bg-slate-50"}`}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  ></path>
                </svg>
                Filters
              </button>

              <div className="relative">
                <select
                  id="sort_order"
                  onChange={handleChange}
                  value={`${sidebardata.sort}_${sidebardata.order}`}
                  className="appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-10 py-3 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
                >
                  <option value="createdAt_desc">Latest Listings</option>
                  <option value="createdAt_asc">Oldest Listings</option>
                  <option value="regularPrice_desc">Price: High to Low</option>
                  <option value="regularPrice_asc">Price: Low to High</option>
                </select>
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </span>
              </div>

              <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors tracking-wide shadow-sm shadow-blue-100">
                Search
              </button>
            </div>
          </div>

          {/* Collapsible Advanced Filter Drawer */}
          {isFilterOpen && (
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all animate-fadeIn">
              {/* Property Type Radio-Style Checkboxes */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                  Listing Type
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {[
                    { id: "all", label: "Any" },
                    { id: "rent", label: "For Rent" },
                    { id: "sale", label: "For Sale" },
                  ].map((t) => (
                    <label
                      key={t.id}
                      className={`flex-1 min-w-[80px] text-center px-4 py-2 rounded-lg border text-sm font-medium cursor-pointer transition-all ${sidebardata.type === t.id ? "border-blue-500 bg-white text-blue-600 shadow-sm" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
                    >
                      <input
                        type="checkbox"
                        id={t.id}
                        className="sr-only"
                        onChange={handleChange}
                        checked={sidebardata.type === t.id}
                      />
                      {t.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Features / Deals Toggle Grid */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                  Promotions & Deals
                </h3>
                <label className="flex items-center gap-3 bg-white px-4 py-2 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                  <input
                    type="checkbox"
                    id="offer"
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                    onChange={handleChange}
                    checked={sidebardata.offer}
                  />
                  <span className="text-sm font-medium text-slate-700">
                    Special Offers / Discounts
                  </span>
                </label>
              </div>

              {/* Infrastructure Utilities */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                  Property Features
                </h3>
                <div className="flex gap-4">
                  <label className="flex items-center gap-3 bg-white px-4 py-2 border border-slate-200 rounded-lg flex-1 cursor-pointer hover:bg-slate-50 transition-colors">
                    <input
                      type="checkbox"
                      id="parking"
                      className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                      onChange={handleChange}
                      checked={sidebardata.parking}
                    />
                    <span className="text-sm font-medium text-slate-700">
                      Parking Space
                    </span>
                  </label>
                  <label className="flex items-center gap-3 bg-white px-4 py-2 border border-slate-200 rounded-lg flex-1 cursor-pointer hover:bg-slate-50 transition-colors">
                    <input
                      type="checkbox"
                      id="furnished"
                      className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                      onChange={handleChange}
                      checked={sidebardata.furnished}
                    />
                    <span className="text-sm font-medium text-slate-700">
                      Furnished
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
