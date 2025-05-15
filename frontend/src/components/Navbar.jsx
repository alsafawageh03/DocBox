import { useState } from "react";
import { Link } from "react-router-dom";

import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`flex justify-between items-center px-5 py-2 transition-colors duration-300 ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* Search Box */}
      <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-[300px]">
        <input
          type="text"
          placeholder="Search Anything"
          className="bg-transparent outline-none w-full text-base"
        />
        <FaSearch className="text-gray-500 text-lg cursor-pointer" />
      </div>

      {/* Icons */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleDarkMode}
          className="bg-transparent border-none focus:outline-none"
        >
          <MdDarkMode className="text-gray-500 hover:text-teal-600 text-2xl cursor-pointer" />
        </button>
        <button className="bg-transparent border-none focus:outline-none">
          <FaBell className="text-gray-500 hover:text-teal-600 text-2xl cursor-pointer" />
        </button>
        <Link to="profile" className="bg-transparent border-none focus:outline-none">
          <FaUserCircle className="text-gray-500 hover:text-teal-600 text-2xl cursor-pointer" />
          </Link>
      </div>
    </div>
  );
}
