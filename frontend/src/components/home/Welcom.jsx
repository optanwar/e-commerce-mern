import React, { useState, useEffect } from "react";

const WelcomeSection = () => {
  // State to store the current background color
  const [bgColor, setBgColor] = useState(
    "bg-gradient-to-r from-green-400 via-blue-500 to-purple-600"
  );

  useEffect(() => {
    // Array of gradient colors for the background
    const colors = [
      "bg-gradient-to-r from-green-400 via-blue-500 to-purple-600",
      "bg-gradient-to-r from-red-500 via-yellow-500 to-pink-500",
      "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
      "bg-gradient-to-r from-teal-400 via-orange-500 to-lime-600",
      "bg-gradient-to-r from-blue-400 via-teal-500 to-green-600",
    ];

    // Change the background color every 5 seconds
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * colors.length);
      setBgColor(colors[randomIndex]);
    }, 2500); // 5000ms = 5 seconds

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className={`${bgColor} relative w-full h-screen flex flex-col items-center justify-center text-center text-white px-4 sm:px-8 transition-all duration-1000 ease-in-out`}
    >
      {/* Dark overlay for text visibility */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Content Section */}
      <div className="relative z-10 space-y-8 container mx-auto">
        <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight">
          Welcome to EcoCommerce
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl mb-6 max-w-2xl mx-auto">
          Discover sustainable products that not only help you live better but also protect the planet. Join the eco-friendly movement today!
        </p>
        <div className="flex justify-center gap-6">
          <a
            href="#shop"
            className="bg-green-600 hover:bg-green-700 text-lg sm:text-xl py-3 px-8 rounded-full shadow-xl transform transition duration-300 ease-in-out hover:scale-105"
          >
            Shop Now
          </a>
          <a
            href="#learn"
            className="bg-transparent border-2 border-white text-lg sm:text-xl py-3 px-8 rounded-full shadow-xl transform transition duration-300 ease-in-out hover:scale-105 hover:bg-white hover:text-gray-900"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
