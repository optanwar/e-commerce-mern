import React, { useState } from 'react';
import { FaShoppingCart, FaUserCircle, FaBars, FaTimes, FaSearch } from 'react-icons/fa';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50 transition-all ease-in-out duration-300">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between py-5">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <a href="#" className="text-3xl font-extrabold text-gray-800 hover:text-primary-700 transition-all duration-300">
              ShopLogo
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-12 items-center">
            <a href="#" className="text-lg font-semibold text-gray-800 hover:text-primary-700 transition-all duration-300">
              Home
            </a>
            <a href="#" className="text-lg font-semibold text-gray-800 hover:text-primary-700 transition-all duration-300">
              Shop
            </a>
            <a href="#" className="text-lg font-semibold text-gray-800 hover:text-primary-700 transition-all duration-300">
              Deals
            </a>
            <a href="#" className="text-lg font-semibold text-gray-800 hover:text-primary-700 transition-all duration-300">
              Blog
            </a>
            <a href="#" className="text-lg font-semibold text-gray-800 hover:text-primary-700 transition-all duration-300">
              Contact
            </a>
          </div>

          {/* Right Icons (Search, Cart, User) */}
          <div className="flex items-center space-x-4 md:space-x-8">
            {/* Search Icon */}
            <button className="text-gray-800 hover:text-primary-700 transition-all duration-300 relative">
              <FaSearch className="text-xl sm:text-2xl md:text-3xl transform transition-all duration-300 hover:scale-110" />
            </button>

            {/* Cart Icon with Badge */}
            <button className="text-gray-800 hover:text-primary-700 transition-all duration-300 relative">
              <FaShoppingCart className="text-xl sm:text-2xl md:text-3xl transform transition-all duration-300 hover:scale-110" />
              <span className="absolute top-0 right-0 inline-block px-2 py-1 text-xs font-bold text-white bg-red-600 rounded-full">3</span>
            </button>

            {/* User Icon */}
            <button className="text-gray-800 hover:text-primary-700 transition-all duration-300">
              <FaUserCircle className="text-xl sm:text-2xl md:text-3xl transform transition-all duration-300 hover:scale-110" />
            </button>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-gray-800 hover:text-primary-700 transition-all duration-300" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <FaTimes className="text-3xl" /> : <FaBars className="text-3xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-40 transition-all transform ease-in-out duration-500 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex justify-end p-6">
            <button onClick={toggleMobileMenu}>
              <FaTimes className="text-3xl text-gray-800" />
            </button>
          </div>
          <div className="flex flex-col items-center space-y-6 pt-20">
            <a href="#" className="text-lg font-semibold text-gray-800 hover:text-primary-700 transition-all duration-300">Home</a>
            <a href="#" className="text-lg font-semibold text-gray-800 hover:text-primary-700 transition-all duration-300">Shop</a>
            <a href="#" className="text-lg font-semibold text-gray-800 hover:text-primary-700 transition-all duration-300">Deals</a>
            <a href="#" className="text-lg font-semibold text-gray-800 hover:text-primary-700 transition-all duration-300">Blog</a>
            <a href="#" className="text-lg font-semibold text-gray-800 hover:text-primary-700 transition-all duration-300">Contact</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
