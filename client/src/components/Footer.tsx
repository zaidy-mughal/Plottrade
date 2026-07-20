import React from "react";
import { Link } from "react-router-dom";

export default function Footer(): React.JSX.Element {
  const currentYear: number = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section: Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
          <div className="lg:col-span-1">
            <Link
              to="/"
              className="text-2xl font-bold text-white tracking-tight"
            >
              Plot<span className="text-blue-500">Trade</span>
            </Link>
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
                <Link
                  to="/search"
                  className="hover:text-blue-400 transition-colors"
                >
                  Browse Plots
                </Link>
              </li>
              <li>
                <Link
                  to="/create-listing"
                  className="hover:text-blue-400 transition-colors"
                >
                  List Your Property
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-4 tracking-wider uppercase text-xs pt-2">
              Company
            </h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/about"
                  className="hover:text-blue-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-blue-400 transition-colors"
                >
                  Contact
                </Link>
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
            <Link
              to="/privacy"
              className="hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
            <Link
              to="/cookies"
              className="hover:text-slate-300 transition-colors"
            >
              Cookie Preferences
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
