import React from 'react';
import { Link } from 'react-router-dom';

export default function About(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      
      {/* Hero Header Section */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white py-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-wider bg-blue-950/50 px-3 py-1.5 rounded-full border border-blue-900/60">
            The Next Generation of Real Estate
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-6 mb-4">
            Redefining How Land &amp; Portfolios Are Traded
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Welcome to plotTrade — a modern marketplace engineering transparent, lightning-fast real estate transactions for agencies, investors, and homeowners.
          </p>
        </div>
      </div>

      {/* Core Mission Block */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl font-bold text-slate-950 tracking-tight">
              Our Vision: Frictionless Brokerage
            </h2>
            <p className="text-slate-600 leading-relaxed">
              At <strong className="text-slate-900">plotTrade</strong>, we believe finding, renting, or purchasing a property shouldn't be held back by fragmented datasets and outdated workflows. We built a platform that aggregates comprehensive listing variables—from verified pricing down to detailed infrastructural utilities—into a single, scannable layout dashboard.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Whether you are listing commercial land plots, managing multi-family rental portfolios, or exploring your family's next suburban home, our platform equips you with advanced granular search utilities and precise parameter control models to close contracts with absolute clarity.
            </p>
          </div>
          
          {/* Key Value Metric Cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-xl border border-slate-200/60 shadow-xs text-center">
              <span className="block text-3xl font-bold text-blue-600">100%</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-1 block">Verified Listings</span>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200/60 shadow-xs text-center">
              <span className="block text-3xl font-bold text-blue-600">Under 5m</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-1 block">Listing Setup</span>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200/60 shadow-xs text-center">
              <span className="block text-3xl font-bold text-blue-600">Zero</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-1 block">Hidden Fees</span>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200/60 shadow-xs text-center">
              <span className="block text-3xl font-bold text-blue-600">24/7</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-1 block">Active Exchange</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Value Pillars */}
      <section className="bg-white border-y border-slate-200 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-950 tracking-tight">Why Industry Leaders Choose plotTrade</h2>
            <p className="text-slate-500 text-sm mt-2">Built on speed, driven by dynamic search data structures.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Intuitive Search Filtering</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Filter exact property criteria instantly. Sort by structural amenities, pricing parameters, discount offers, and listing status without page reloads.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Cloud Image Optimization</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Manage property assets seamlessly. High-fidelity image arrays are securely compiled and safely rendered to potential buyers instantly.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Protected Account Controls</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Your portfolio dashboard belongs strictly to you. Modify parameters, drop prices, or safely delete outdated entries inside a protected profile loop.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action Section */}
      <section className="max-w-5xl mx-auto px-4 py-16 text-center">
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 sm:p-12 shadow-2xs">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
            Ready to find your next real estate asset?
          </h2>
          <p className="text-slate-600 mt-2 mb-6 max-w-md mx-auto text-sm sm:text-base">
            Explore active listings right now or create your free account to broadcast your land, plot, or home to thousands of monthly traders.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/search"
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl shadow-sm transition-colors text-sm tracking-wide"
            >
              Browse Active Listings
            </Link>
            <Link
              to="/create-listing"
              className="inline-flex items-center justify-center bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold px-6 py-3 rounded-xl shadow-2xs transition-colors text-sm tracking-wide"
            >
              List Your Property
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}