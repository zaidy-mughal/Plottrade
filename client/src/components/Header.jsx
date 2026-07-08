import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl md:text-2xl flex flex-wrap">
            <span className="text-blue-500">Plot</span>
            <span className="text-slate-800">Trade</span>
          </h1>
        </Link>
        <Link
          to="/search"
          className="bg-slate-100 hover:bg-blue-300 text-slate-600 hover:text-slate-800 p-3 rounded-full flex items-stretch gap-2 transition-colors font-medium text-sm sm:px-8 md:px-16 lg:px-32 xl:px-48"
          title="Open properties search"
        >
          <FaSearch className="text-slate-500" />
          <span className="hidden sm:inline">Search Properties</span>
        </Link>
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
              <li className=" text-slate-700 hover:underline"> Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
