import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai"; // Using an icon from react-icons library

const SearchComponent = () => {
  const [query, setQuery] = useState("");

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search Query:", query); // Handle the search logic here
    // Example: you could redirect to a search results page
  };

  return (
    <div className="max-w-xl mx-auto mt-12 min-h-screen px-4 flex justify-center items-center flex-col">
      <form
        onSubmit={handleSearchSubmit}
        className="relative w-full flex items-center bg-white border border-gray-300 rounded-xl  overflow-hidden focus-within:ring-2 focus-within:ring-yellow-500 transition-all shadow-lg"
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

      {/* Optionally display a search suggestion or recent search */}
      {query && (
        <div className="mt-6 bg-white border border-gray-300 rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold text-gray-800">Suggestions:</h3>
          <ul className="mt-2 space-y-2">
            <li className="text-gray-600 hover:text-yellow-600 cursor-pointer transition-all">Product 1</li>
            <li className="text-gray-600 hover:text-yellow-600 cursor-pointer transition-all">Product 2</li>
            <li className="text-gray-600 hover:text-yellow-600 cursor-pointer transition-all">Product 3</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
