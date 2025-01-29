import React, { useState } from 'react';
import { FaShoppingCart, FaUserCircle, FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import NavItems from '../json/navItem.json'
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg fixed top-0 w-full z-50">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="text-3xl font-bold tracking-wide hover:opacity-90">
          <span className="text-yellow-400">Shop</span>Ease
          </Link>
        
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {NavItems.map((item) => (
              <a
                key={item.id}
                href={item.url}
                className="text-lg font-medium hover:text-yellow-300 transition-all duration-300"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-6">
            {/* Search Icon */}
            <Link to="/search" className="hover:text-yellow-300 transition-all duration-300">           
              <FaSearch className="text-xl" />
              </Link>
      

            {/* Cart Icon */}
            <button className="relative hover:text-yellow-300 transition-all duration-300">
              <FaShoppingCart className="text-xl" />
              <span className="absolute -top-2 -right-2 bg-yellow-500 text-xs text-black rounded-full px-1">
                3
              </span>
            </button>

  
            <Link to="/login" className="hover:text-yellow-300 transition-all duration-300">           
            <FaUserCircle className="text-xl" />
              </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden hover:text-yellow-300 transition-all duration-300"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed top-0 right-0 w-3/4 h-full bg-white shadow-lg text-gray-800 z-40 transform transition-transform duration-500 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-end p-6">
            <button onClick={toggleMobileMenu}>
              <FaTimes className="text-3xl text-gray-800" />
            </button>
          </div>
          <div className="flex flex-col items-center space-y-8 mt-16">
            {NavItems.map((item) => (
              <a
                key={item.id}
                href={item.url}
                className="text-lg font-medium hover:text-blue-600 transition-all duration-300"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
