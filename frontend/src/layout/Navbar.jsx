import React, { useState } from "react";
import { Link } from "react-router-dom"; // For navigation if you're using React Router
import { FaSearch, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa"; // Importing icons from react-icons
import { FaCircleUser } from "react-icons/fa6";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-30">
      <nav className="container mx-auto px-6 sm:px-10 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="text-2xl font-semibold text-blue-600 hover:text-blue-700 transition">
            EcoCommerce
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className="text-gray-800 hover:text-blue-600 font-semibold transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="text-gray-800 hover:text-blue-600 font-semibold transition duration-300"
          >
            Shop
          </Link>
          <Link
            to="/about"
            className="text-gray-800 hover:text-blue-600 font-semibold transition duration-300"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-gray-800 hover:text-blue-600 font-semibold transition duration-300"
          >
            Contact
          </Link>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              className="bg-gray-100 border border-gray-300 rounded-lg py-2 pl-10 pr-4 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search..."
            />
            <FaSearch className="absolute top-3 left-3 text-gray-500 w-5 h-5" />
          </div>

          {/* Cart Icon */}
          <button className="relative text-gray-800 hover:text-blue-600">
            <FaShoppingCart className="w-6 h-6" />
            <span className="absolute -top-1.5 -right-2 text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>
          <Link
            to="/login"
            className="text-gray-800 hover:text-blue-600 font-semibold transition duration-300"
          >
            <FaCircleUser/>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-800 hover:text-blue-600 focus:outline-none"
          >
            <FaBars className={`w-6 h-6 ${isMenuOpen ? "hidden" : "block"}`} />
            <FaTimes className={`w-6 h-6 ${isMenuOpen ? "block" : "hidden"}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="container mx-auto md:hidden bg-white shadow-md p-4 space-y-4">
          <Link
            to="/"
            className="block text-gray-800 hover:text-blue-600 font-semibold"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="block text-gray-800 hover:text-blue-600 font-semibold"
          >
            Shop
          </Link>
          <Link
            to="/about"
            className="block text-gray-800 hover:text-blue-600 font-semibold"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block text-gray-800 hover:text-blue-600 font-semibold"
          >
            Contact
          </Link>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              className="bg-gray-100 border border-gray-300 rounded-lg py-2 pl-10 pr-4 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search..."
            />
            <FaSearch className="absolute top-3 left-3 text-gray-500 w-5 h-5" />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
