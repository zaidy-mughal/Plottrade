import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Listing from '../components/Listing';
import FilterBar from '../components/FilterBar';

export default function Search() {
  const location = useLocation();

  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'createdAt',
    order: 'desc',
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm') || '';
    const typeFromUrl = urlParams.get('type') || 'all';
    const parkingFromUrl = urlParams.get('parking') === 'true';
    const furnishedFromUrl = urlParams.get('furnished') === 'true';
    const offerFromUrl = urlParams.get('offer') === 'true';
    const sortFromUrl = urlParams.get('sort') || 'createdAt';
    const orderFromUrl = urlParams.get('order') || 'desc';

    setSidebardata({
      searchTerm: searchTermFromUrl,
      type: typeFromUrl,
      parking: parkingFromUrl,
      furnished: furnishedFromUrl,
      offer: offerFromUrl,
      sort: sortFromUrl,
      order: orderFromUrl,
    });

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listings/?${searchQuery}`);
      const data = await res.json();
      setShowMore(data.length > 8);
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);



  const onShowMoreClick = async () => {
    const startIndex = listings.length;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const res = await fetch(`/api/listings/?${urlParams.toString()}`);
    const data = await res.json();
    if (data.length < 9) setShowMore(false);
    setListings((prev) => [...prev, ...data]);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Search and Filters Header */}
        <FilterBar
          sidebardata={sidebardata}
          setSidebardata={setSidebardata}
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
        />

      {/* Main Listing View Area */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-4 mb-6">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">
            Available Properties {!loading && `(${listings.length})`}
          </h2>
        </div>

        {/* Dynamic States Layout */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-slate-500 font-medium">Fetching pristine listings...</p>
          </div>
        )}

        {!loading && listings.length === 0 && (
          <div className="text-center py-20 bg-white border border-dashed border-slate-200 rounded-2xl max-w-xl mx-auto px-4">
            <svg className="mx-auto h-12 w-12 text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <h3 className="text-lg font-semibold text-slate-800">No matching listings found</h3>
            <p className="mt-1 text-slate-500">Try adjusting your keyword options or clearing active parameters.</p>
          </div>
        )}

        {!loading && listings && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-stretch">
            {listings.map((listing) => (
              <Listing key={listing._id} listing={listing} />
            ))}
          </div>
        )}

        {/* Pagination Action */}
        {showMore && !loading && (
          <div className="mt-12 text-center">
            <button
              onClick={onShowMoreClick}
              className="px-6 py-2.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 font-medium rounded-xl transition-colors shadow-sm text-sm"
            >
              Load More Properties
            </button>
          </div>
        )}
      </main>
    </div>
  );
}