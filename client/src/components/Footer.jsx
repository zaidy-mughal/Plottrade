import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section: Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
          <div className="lg:col-span-1">
            <a
              href="/"
              className="text-2xl font-bold text-white tracking-tight"
            >
              Plot<span className="text-blue-500">Trade</span>
            </a>
            <p className="mt-4 text-slate-400 max-w-sm leading-relaxed">
              Your trusted marketplace for buying, selling, and trading premium
              real estate plots. Find your next investment with confidence.
            </p>
          </div>
          <div>
            <h5 className="text-white font-semibold mb-4 tracking-wider uppercase text-xs pt-2">
              Buy & Sell
            </h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="/search"
                  className="hover:text-blue-400 transition-colors"
                >
                  Browse Plots
                </a>
              </li>
              <li>
                <a
                  href="/create-listing"
                  className="hover:text-blue-400 transition-colors"
                >
                  List Your Property
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-4 tracking-wider uppercase text-xs pt-2">
              Company
            </h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="/about"
                  className="hover:text-blue-400 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-blue-400 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-4 tracking-wider uppercase text-xs pt-2">
              Contact Support
            </h5>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                Email:{" "}
                <a
                  href="mailto:support@plottrade.com"
                  className="text-slate-300 hover:text-blue-400"
                >
                  support@plottrade.com
                </a>
              </li>
              <li>
                Phone: <span className="text-slate-300">+1 (555) 019-2834</span>
              </li>
              <li>
                Hours:{" "}
                <span className="text-slate-300">Mon - Fri, 9AM - 6PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Copyright & Legal */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>
            &copy; {currentYear} PlotTrade Technologies Inc. All rights
            reserved.
          </div>
          <div className="flex gap-6">
            <a
              href="/privacy"
              className="hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </a>
            <a
              href="/cookies"
              className="hover:text-slate-300 transition-colors"
            >
              Cookie Preferences
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
