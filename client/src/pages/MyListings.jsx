import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Listing from "../components/Listing";

export default function MyListings() {
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchUserListings = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/listings/me`);
        const data = await res.json();
        setListings(data);
      } catch (error) {
        console.error("Failed fetching user portfolios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserListings();
  }, []);

  const handleDeleteListing = async (listingId) => {
    if (
      window.confirm(
        "Are you completely sure you want to permanently delete this listing?",
      )
    ) {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/listings/delete/${listingId}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (data.success === false) return;

        // Dynamically slice the active listings array down
        setListings((prev) =>
          prev.filter((listing) => listing._id !== listingId),
        );
      } catch (error) {
        console.error("Deletion failure:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* 2. Portfolio Control Panel Block with prominent action layout */}
      <div className="bg-white border-b border-slate-200 py-6 mb-8 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-950 tracking-tight">
              Your Real Estate Portfolios
            </h1>
            <p className="text-slate-500 text-sm mt-0.5">
              Manage details, modify active pricing tables, or clear old plots
              off the market.
            </p>
          </div>

          {/* Prominent Action Navigation Anchor */}
          <Link
            to="/create-listing"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-3 rounded-xl transition-colors text-sm tracking-wide shadow-sm shadow-blue-100 hover:shadow-md group shrink-0"
          >
            <svg
              className="w-5 h-5 transition-transform group-hover:rotate-90 duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              ></path>
            </svg>
            Create New Listing
          </Link>
        </div>
      </div>

      {/* 3. Listings Output Container Area */}
      <main className="max-w-7xl mx-auto px-4 pb-16 sm:px-6 lg:px-8">
        {loading && (
          <div className="text-center py-24 flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-3"></div>
            <p className="text-slate-500 font-medium text-sm">
              Organizing your database files...
            </p>
          </div>
        )}

        {!loading && listings.length === 0 && (
          <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl max-w-xl mx-auto px-6">
            <div className="inline-flex p-4 bg-slate-50 rounded-full text-slate-400 mb-4">
              <svg
                className="h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                ></path>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              No matching records found
            </h3>
            <p className="mt-1 text-slate-500 text-sm max-w-sm mx-auto">
              You don't have any properties active matching these filter
              selections. Alter your layout filters or launch a clean item card
              below.
            </p>
            <Link
              to="/create-listing"
              className="mt-5 inline-flex text-sm font-semibold text-blue-600 hover:text-blue-500 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors"
            >
              Get Started Now &rarr;
            </Link>
          </div>
        )}

        {!loading && listings.length > 0 && (
          <div className="grid grid-cols-1 justify-center sm:grid-cols-[repeat(auto-fill,330px)] gap-8 items-stretch mx-auto">
            {listings.map((listing) => (
              <div className="flex flex-col " key={listing._id}>
                {/* 1. Core listing information fills the top and middle space */}
                <div className="flex-1 ">
                  <Listing listing={listing} />
                </div>

                {/* 2. Management Action Buttons anchored permanently to the baseline */}
                <div className="flex flex-1 bg-white gap-3">
                  <Link
                    to={`/update-listing/${listing._id}`}
                    className="flex-1 inline-flex items-center justify-center bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-200 font-semibold text-sm rounded-lg shadow-2xs transition-colors"
                    title="Edit Properties"
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
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      ></path>
                    </svg>
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDeleteListing(listing._id)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 hover:text-red-600 hover:border-red-200 font-semibold text-sm rounded-lg shadow-2xs transition-colors"
                    title="Delete Entry"
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
