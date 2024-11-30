import { useState } from "react";
import { NavbarData } from "../data/Navbar";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="w-full bg-gray-900 text-white shadow-md">
      {/* Main Navbar */}
      <div className="container mx-auto flex justify-between items-center p-4">
      <Link to= {'/'}>
      <div className="logo text-4xl cursor-pointer font-extrabold bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-500 text-transparent bg-clip-text drop-shadow-lg hover:drop-shadow-2xl transition-all duration-300">
       Task<span className="text-gray-900 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">Vault</span>
      </div>
      </Link>


        {/* Hamburger Menu for Mobile */}
        <div
          className="md:hidden cursor-pointer text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "✖" : "☰"}
        </div>
        {/* Links for Larger Screens */}
        <div className="hidden md:flex items-center gap-x-6">
          {NavbarData.map((link, idx) => (
            <NavLink
              key={idx}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400 font-semibold text-lg border-b-2 border-blue-400 pb-1"
                  : "text-gray-300 font-medium text-lg hover:text-blue-400 hover:border-b-2 hover:border-blue-400 pb-1"
              }
            >
              {link.title}
            </NavLink>
          ))}
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="flex flex-col items-center md:hidden bg-gray-800 gap-y-3 py-3">
          {NavbarData.map((link, idx) => (
            <NavLink
              key={idx}
              to={link.path}
              onClick={() => setIsMenuOpen(false)} // Close menu on click
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400 font-semibold text-lg border-b-2 border-blue-400 pb-1"
                  : "text-gray-300 font-medium text-lg hover:text-blue-400 hover:border-b-2 hover:border-blue-400 pb-1"
              }
            >
              {link.title}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
