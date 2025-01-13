import React, { useState } from "react";
import Rating from "@mui/material/Rating";

const productsData = [
  { id: 1, name: "Product 1", price: "$50", rating: 4, category: "Electronics" },
  { id: 2, name: "Product 2", price: "$70", rating: 5, category: "Fashion" },
  { id: 3, name: "Product 3", price: "$30", rating: 3, category: "Fashion" },
  { id: 4, name: "Product 4", price: "$90", rating: 4, category: "Home" },
  { id: 5, name: "Product 5", price: "$40", rating: 5, category: "Electronics" },
  { id: 6, name: "Product 6", price: "$60", rating: 4, category: "Home" },
  { id: 7, name: "Product 7", price: "$20", rating: 2, category: "Electronics" },
  { id: 8, name: "Product 8", price: "$100", rating: 5, category: "Fashion" },
];

const ProductPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [productsPerPage] = useState(4);

  // Filter products by category
  const filteredProducts =
    selectedCategory === "All"
      ? productsData
      : productsData.filter((product) => product.category === selectedCategory);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Handle category filter change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Filters Section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 rounded ${
              selectedCategory === "All"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleCategoryChange("All")}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded ${
              selectedCategory === "Electronics"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleCategoryChange("Electronics")}
          >
            Electronics
          </button>
          <button
            className={`px-4 py-2 rounded ${
              selectedCategory === "Fashion"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleCategoryChange("Fashion")}
          >
            Fashion
          </button>
          <button
            className={`px-4 py-2 rounded ${
              selectedCategory === "Home"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleCategoryChange("Home")}
          >
            Home
          </button>
        </div>
      </div>

      {/* Products Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded shadow hover:shadow-lg transition"
          >
            <div className="h-40 bg-gray-200 flex items-center justify-center text-gray-500">
              Image Placeholder
            </div>
            <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">{product.price}</p>
            <Rating value={product.rating} readOnly />
          </div>
        ))}
      </div>

      {/* Pagination Section */}
      <div className="flex justify-center items-center mt-8 gap-4">
        <button
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white"
          }`}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={`px-4 py-2 rounded ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white"
          }`}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
