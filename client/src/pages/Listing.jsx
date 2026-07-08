import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaRegCompass,
} from 'react-icons/fa';
import { HiOutlineShare, HiCheck } from 'react-icons/hi';
import Contact from '../components/Contact';

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listings/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900 antialiased selection:bg-zinc-200">
      {/* Elegant Loading State */}
      {loading && (
        <div className="flex flex-col justify-center items-center min-h-[70vh] gap-4">
          <div className="h-6 w-6 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs tracking-widest uppercase text-zinc-400 font-medium">Loading Residence</p>
        </div>
      )}

      {/* Elegant Error State */}
      {error && (
        <div className="flex flex-col justify-center items-center min-h-[70vh] text-center px-6">
          <p className="text-sm tracking-widest uppercase text-zinc-400 font-semibold mb-2">An Error Occurred</p>
          <p className="text-zinc-600 font-serif text-lg max-w-md">We were unable to curate this property listing at this moment.</p>
        </div>
      )}

      {listing && !loading && !error && (
        <div className="pb-24">
          {/* Cinema-Style Media Showcase */}
          <div className="relative max-w-[1400px] mx-auto md:px-4 pt-4 group">
            <Swiper 
              navigation 
              className="overflow-hidden rounded-none md:rounded-2xl shadow-xl shadow-zinc-200/50"
            >
              {listing.imageUrls.map((url) => (
                <SwiperSlide key={url}>
                  <div
                    className="h-[450px] sm:h-[550px] lg:h-[650px] w-full bg-cover bg-center transition-transform duration-1000 scale-100 hover:scale-[1.02]"
                    style={{ backgroundImage: `url(${url})` }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Minimalist Action Controls */}
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="absolute top-8 right-8 z-10 bg-white/80 backdrop-blur-md p-3.5 rounded-full border border-zinc-200/50 text-zinc-800 hover:bg-white hover:text-zinc-950 shadow-sm transition-all duration-300 active:scale-95"
              aria-label="Share property link"
            >
              <HiOutlineShare className="text-xl" />
            </button>

            {/* Subtle Text Toast */}
            {copied && (
              <div className="fixed bottom-8 right-8 z-50 flex items-center gap-2.5 bg-zinc-900 text-white px-5 py-3 rounded-lg shadow-xl tracking-wide text-xs uppercase font-medium animate-fade-in">
                <HiCheck className="text-emerald-400 text-sm" />
                <span>Link Copied to Portfolio</span>
              </div>
            )}
          </div>

          {/* Premium Editorial Grid Layout */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              
              {/* Left Column: Core Property Details */}
              <div className="lg:col-span-2 space-y-10">
                
                {/* Header Information */}
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-[10px] tracking-[0.2em] font-semibold uppercase px-2.5 py-1 bg-zinc-900 text-white rounded">
                      {listing.type === 'rent' ? 'For Lease' : 'Exclusive Sale'}
                    </span>
                    {listing.offer && (
                      <span className="text-[10px] tracking-[0.2em] font-semibold uppercase px-2.5 py-1 border border-zinc-300 text-zinc-600 rounded">
                        Special Pricing Available
                      </span>
                    )}
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-zinc-900 font-serif">
                    {listing.name}
                  </h1>

                  <p className="flex items-center gap-2 text-zinc-500 text-sm tracking-wide">
                    <FaMapMarkerAlt className="text-zinc-400 shrink-0" />
                    <span>{listing.address}</span>
                  </p>
                </div>

                <hr className="border-zinc-200" />

                {/* Refined Spatial Amenities Layout */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-400 mb-5">Residence Architecture</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="border border-zinc-200 bg-white p-4 rounded-xl flex flex-col gap-3">
                      <FaBed className="text-xl text-zinc-400" />
                      <div>
                        <p className="text-xs text-zinc-400 uppercase font-medium tracking-wider">Bedrooms</p>
                        <p className="text-base font-semibold text-zinc-800">{listing.bedrooms}</p>
                      </div>
                    </div>
                    <div className="border border-zinc-200 bg-white p-4 rounded-xl flex flex-col gap-3">
                      <FaBath className="text-xl text-zinc-400" />
                      <div>
                        <p className="text-xs text-zinc-400 uppercase font-medium tracking-wider">Bathrooms</p>
                        <p className="text-base font-semibold text-zinc-800">{listing.bathrooms}</p>
                      </div>
                    </div>
                    <div className="border border-zinc-200 bg-white p-4 rounded-xl flex flex-col gap-3">
                      <FaParking className="text-xl text-zinc-400" />
                      <div>
                        <p className="text-xs text-zinc-400 uppercase font-medium tracking-wider">Vehicles</p>
                        <p className="text-base font-semibold text-zinc-800">{listing.parking ? 'Allocated Space' : 'None'}</p>
                      </div>
                    </div>
                    <div className="border border-zinc-200 bg-white p-4 rounded-xl flex flex-col gap-3">
                      <FaChair className="text-xl text-zinc-400" />
                      <div>
                        <p className="text-xs text-zinc-400 uppercase font-medium tracking-wider">Interior</p>
                        <p className="text-base font-semibold text-zinc-800">{listing.furnished ? 'Fully Furnished' : 'Unfurnished'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="border-zinc-200" />

                {/* Editorial Narrative / Description */}
                <div className="space-y-4">
                  <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-400">The Space & Narrative</h2>
                  <p className="text-zinc-600 font-serif leading-relaxed text-base sm:text-lg whitespace-pre-line">
                    {listing.description}
                  </p>
                </div>
              </div>

              {/* Right Column: Premium Sticky Pricing & Concierge Contact Card */}
              <div className="lg:sticky lg:top-8 bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-400 mb-1">Investment Valuation</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-light tracking-tight text-zinc-900 font-serif">
                      ${listing.offer
                        ? listing.discountPrice.toLocaleString('en-US')
                        : listing.regularPrice.toLocaleString('en-US')}
                    </span>
                    {listing.type === 'rent' && <span className="text-sm text-zinc-500 font-normal"> / mo</span>}
                  </div>
                  
                  {listing.offer && (
                    <p className="text-xs text-emerald-700 font-medium mt-2 bg-emerald-50 inline-block px-2.5 py-1 rounded">
                      Exclusive Savings of ${(+listing.regularPrice - +listing.discountPrice).toLocaleString('en-US')} Applied
                    </p>
                  )}
                </div>

                <div className="border-t border-zinc-100 pt-6">
                  {currentUser && listing.userRef !== currentUser._id && !contact && (
                    <button
                      onClick={() => setContact(true)}
                      className="w-full bg-zinc-900 text-white rounded-xl font-medium tracking-widest text-xs uppercase hover:bg-zinc-800 active:scale-[0.99] transition-all py-4 shadow-md shadow-zinc-900/10"
                    >
                      Inquire with Landlord
                    </button>
                  )}

                  {contact && (
                    <div className="animate-fade-in">
                      <Contact listing={listing} />
                    </div>
                  )}

                  {!currentUser && (
                    <p className="text-xs text-center text-zinc-400 italic">
                      Please authenticate to initiate broker concierge.
                    </p>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </main>
  );
}