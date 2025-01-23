import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Information */}
          <div>
          <a href="#" className="text-3xl font-bold tracking-wide hover:opacity-90 ">
            <span className="text-yellow-400">Shop</span>Ease
          </a>
            <p className="text-gray-400 py-4">
              We provide the best shopping experience with high-quality products and fast delivery. Your satisfaction is our top priority.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-yellow-500 transition duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-yellow-500 transition duration-300"
              >
                Terms of Service
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-bold text-yellow-500 mb-4">Quick Links</h3>
            <ul>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-500 transition duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-500 transition duration-300"
                >
                  Shop
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-500 transition duration-300"
                >
                  Offers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-500 transition duration-300"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h3 className="text-2xl font-bold text-yellow-500 mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter and be the first to know about new arrivals and exclusive offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-l-lg text-gray-900"
              />
              <button className="bg-yellow-500 text-gray-900 px-6 py-2 rounded-r-lg hover:bg-yellow-400 transition duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-12 text-center">
          <div className="flex justify-center space-x-6">
            <a
              href="#"
              className="text-gray-400 hover:text-yellow-500 transition duration-300"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-yellow-500 transition duration-300"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-yellow-500 transition duration-300"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-yellow-500 transition duration-300"
            >
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-gray-700 pt-4 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
