import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

export default function Header(): React.JSX.Element {
  const { currentUser } = useSelector((state: RootState) => state.user);

  return (
    <header className="sticky top-0 z-50 bg-slate-200 shadow-md">
      {/* Replaced 'flex justify-between' with 'grid grid-cols-3' */}
      <div className="grid grid-cols-3 items-center max-w-6xl mx-auto p-3">
        {/* Left Column: Logo */}
        <div className="justify-self-start">
          <Link to="/">
            <h1 className="font-bold text-sm sm:text-xl md:text-2xl flex flex-wrap">
              <span className="text-blue-500">Plot</span>
              <span className="text-slate-800">Trade</span>
            </h1>
          </Link>
        </div>

        {/* Center Column: Search Bar */}
        <div className="justify-self-center w-full flex justify-center">
          <Link
            to="/search"
            className="bg-slate-100 hover:bg-blue-300 text-slate-600 hover:text-slate-800 p-3 rounded-full flex items-center justify-center gap-2 transition-colors font-medium text-sm w-full max-w-md"
            title="Open properties search"
          >
            <FaSearch className="text-slate-500 shrink-0" />
            <span className="hidden sm:inline">Search Properties</span>
          </Link>
        </div>

        {/* Right Column: Navigation */}
        <div className="justify-self-end">
          <ul className="flex gap-6 items-center">
            <Link to="/">
              <li className="hidden sm:inline md:text-1xl text-slate-700 hover:underline">
                Home
              </li>
            </Link>
            <Link to="/about">
              <li className="hidden sm:inline md:text-1xl text-slate-700 hover:underline">
                About
              </li>
            </Link>
            <Link to="/profile">
              {currentUser ? (
                <img
                  className="rounded-full h-9 w-9 object-cover"
                  src={currentUser.avatar}
                  alt="profile"
                />
              ) : (
                <li className="text-slate-700 hover:underline">Sign in</li>
              )}
            </Link>
          </ul>
        </div>
      </div>
    </header>
  );
}
