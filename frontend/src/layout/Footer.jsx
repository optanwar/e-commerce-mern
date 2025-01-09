import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-16">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-bold mb-6">About EcoCommerce</h3>
            <p className="text-gray-400 text-sm mb-4">
              EcoCommerce brings eco-friendly products to your doorstep. We aim to make a positive impact on the environment while providing high-quality products for sustainable living.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="https://facebook.com" className="text-gray-400 hover:text-blue-600 transition duration-300">
                <FaFacebookF className="w-6 h-6" />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-pink-600 transition duration-300">
                <FaInstagram className="w-6 h-6" />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-blue-400 transition duration-300">
                <FaTwitter className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-blue-700 transition duration-300">
                <FaLinkedinIn className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="/" className="hover:text-blue-500 transition duration-300">Home</a></li>
              <li><a href="/shop" className="hover:text-blue-500 transition duration-300">Shop</a></li>
              <li><a href="/about" className="hover:text-blue-500 transition duration-300">About Us</a></li>
              <li><a href="/contact" className="hover:text-blue-500 transition duration-300">Contact</a></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Contact Us</h3>
            <p className="text-gray-400 text-sm mb-4">Email: info@ecocommerce.com</p>
            <p className="text-gray-400 text-sm mb-4">Phone: +1 (123) 456-7890</p>
            <p className="text-gray-400 text-sm">Address: 123 Green Street, Eco City</p>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">Subscribe to our newsletter to get updates about new products and eco-friendly living tips.</p>
            <div className="flex items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-700 text-white text-sm rounded-l-lg py-3 px-4 w-2/3 sm:w-3/4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 text-white text-sm rounded-r-lg px-6 py-3 sm:px-8 sm:py-3 hover:bg-blue-700 transition duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-12 border-t border-gray-700 pt-8 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} EcoCommerce. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
