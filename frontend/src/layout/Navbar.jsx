import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md dark:bg-gray-900 sticky w-full top-0 left-0 z-50 transition-all duration-300 ease-in-out py-1 md:py-2 lg:py-3 xl:py-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="text-2xl font-bold text-white">Brand</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-700 dark:text-gray-200 hover:text-primary">
              Home
            </a>
            <a href="#" className="text-gray-700 dark:text-gray-200 hover:text-primary">
              About
            </a>
            <a href="#" className="text-gray-700 dark:text-gray-200 hover:text-primary">
              Services
            </a>
            <a href="#" className="text-gray-700 dark:text-gray-200 hover:text-primary">
              Contact
            </a>
          </div>

          {/* Icons + Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <FaRegUserCircle size={24} className="text-gray-700 dark:text-gray-200 hidden sm:block" />
            <IoMdCart size={24} className="text-gray-700 dark:text-gray-200 hidden sm:block" />
            <button 
              onClick={() => setIsOpen(true)}
              className="md:hidden text-gray-700 dark:text-gray-200"
            >
              <AiOutlineMenu size={28} />
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar Menu (Opens from Right) */}
      <div className={`fixed top-0 right-0 w-64 h-full bg-white dark:bg-gray-900 shadow-lg transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out md:hidden`}>
        <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-700">
         <div className="flex items-center space-x-4">
         <FaRegUserCircle size={24} className="text-gray-700 dark:text-gray-200 sm:hidden" />
         <IoMdCart size={24} className="text-gray-700 dark:text-gray-200 sm:hidden" />
         </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-700 dark:text-gray-200">
            <AiOutlineClose size={24} />
          </button>
        </div>
        <div className="flex flex-col space-y-4 p-4">
          <a href="#" className="text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded">
            Home
          </a>
          <a href="#" className="text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded">
            About
          </a>
          <a href="#" className="text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded">
            Services
          </a>
          <a href="#" className="text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded">
            Contact
          </a>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
