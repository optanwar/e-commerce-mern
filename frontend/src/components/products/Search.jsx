import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai"; // Using an icon from react-icons library
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const SearchComponent = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products/${query}`); // Navigate to the specific search query
    } else {
      navigate(`/products`); // Navigate to the general products page
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 min-h-screen px-4 flex justify-center items-center flex-col">
      <form
        onSubmit={handleSearchSubmit}
        className="relative w-full flex items-center bg-white border border-gray-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-yellow-500 transition-all shadow-lg"
      >
        {/* Search Input */}
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Search for products..."
          className="w-full py-3 px-4 text-lg text-gray-700 placeholder-gray-500 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
        />
        {/* Search Icon */}
        <button
          type="submit"
          className="absolute right-3 text-gray-500 hover:text-yellow-500 transition-all focus:outline-none"
        >
          <AiOutlineSearch size={24} />
        </button>
      </form>
    </div>
  );
};

export default SearchComponent;
