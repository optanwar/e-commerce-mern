import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai"; // Using an icon from react-icons library
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const SearchComponent = () => {
  const [query, setQuery] = useState(""); // Search query state
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle changes in the search input
  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  // Handle form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();

    // Ensure query is not empty or just spaces
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      navigate(`/products/${trimmedQuery}`); // Navigate to the specific search query
    } else {
      navigate(`/products`); // Navigate to the general products page
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 flex justify-center items-center min-h-screen px-4">
      <form
        onSubmit={handleSearchSubmit}
        className="relative w-full flex items-center bg-white border border-gray-300 rounded-xl overflow-hidden shadow-lg focus-within:ring-2 focus-within:ring-yellow-500 transition-all"
      >
        {/* Search Input */}
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Search for products..."
          className="w-full py-3 px-4 text-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-0"
        />

        {/* Search Icon Button */}
        <button
          type="submit"
          className="absolute right-3 text-gray-500 hover:text-yellow-500 transition-all focus:outline-none"
          aria-label="Search"
        >
          <AiOutlineSearch size={24} />
        </button>
      </form>
    </div>
  );
};

export default SearchComponent;
