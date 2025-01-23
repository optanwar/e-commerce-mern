import React, { useEffect, useState } from "react";

const HeroSection = () => {
  const colors = [
    // "bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500",
    // "bg-gradient-to-br from-blue-500 via-teal-400 to-green-500",
    // "bg-gradient-to-br from-red-500 via-orange-400 to-yellow-500",
  ]; // Array of gradient classes
  const [currentColor, setCurrentColor] = useState(0);

  // Change the background color every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColor((prev) => (prev + 1) % colors.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className={`relative min-h-screen flex items-center transition-colors duration-1000 ${colors[currentColor]}`}
    >
      <div className="container mx-auto px-6 lg:px-12 flex flex-col-reverse lg:flex-row items-center">
        {/* Left Content */}
        <div className="lg:w-1/2 text-center lg:text-left space-y-6 md:space-y-8 lg:space-y-10 xl:space-y-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-wide">
            Shop the <span className="text-yellow-400">Latest Trends</span> <br />
            in <span className="underline  decoration-wavy decoration-yellow-400">Fashion</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-200">
            Upgrade your wardrobe with premium quality fashion pieces, available at exclusive prices.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
            <a
              href="#shop"
              className="bg-yellow-400 text-gray-900 px-6 py-3 text-lg font-semibold rounded-full shadow-lg hover:bg-yellow-300 hover:shadow-xl transition-all duration-300"
            >
              Start Shopping
            </a>
            <a
              href="#offers"
              className="bg-transparent border-2 border-white px-6 py-3 text-lg font-semibold rounded-full shadow-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              View Offers
            </a>
          </div>
        </div>

        {/* Right Content: Hero Image */}
        <div className="lg:w-1/2 flex justify-center lg:justify-end relative">
          <img
            src="../../../public/vite.svg"
            alt="Fashion"
            className="w-28 lg:w-4/5 rounded-lg transform hover:scale-105 transition-all duration-500"
          />
          {/* Decorative Element */}
          <div className="absolute top-10 right-10 bg-yellow-400 w-28 h-28 rounded-full blur-xl opacity-30 animate-pulse hidden lg:block"></div>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-pink-300 opacity-50 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-0 w-40 h-40 bg-blue-300 opacity-40 rounded-full blur-3xl"></div>
    </section>
  );
};

export default HeroSection;
