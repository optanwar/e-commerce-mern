import React, { useState } from "react";
import { FaStar, FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";
import Swal from "sweetalert2";

const ProductDetails = () => {
  // Dummy Product Data
  const product = {
    name: "Amazing Product",
    images: [
      "https://via.placeholder.com/600x600/FF6347", // Main product image
      "https://via.placeholder.com/600x600/FFD700", // Thumbnail 1
      "https://via.placeholder.com/600x600/008080", // Thumbnail 2
      "https://via.placeholder.com/600x600/8A2BE2", // Thumbnail 3
    ],
    description:
      "This is an amazing product that will solve all your problems. It is of the highest quality and comes with a satisfaction guarantee.",
    price: 49.99,
    inStock: true,
  };

  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(4); // Pre-set a rating of 4
  const [review, setReview] = useState("");
  const [mainImage, setMainImage] = useState(product.images[0]); // Set the first image as the main image

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleReviewSubmit = () => {
    if (!review) {
      Swal.fire({
        title: "Oops!",
        text: "Please write a review before submitting.",
        icon: "warning",
      });
    } else {
      Swal.fire({
        title: "Success!",
        text: "Your review has been submitted.",
        icon: "success",
      });
      // Submit the review logic here
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto p-8 bg-white shadow-xl rounded-lg mt-20">
      {/* Product Image Gallery */}
      <div className="flex flex-col md:flex-row md:space-x-8 space-y-6 md:space-y-0">
        {/* Main Image */}
        <div className="md:w-1/2 flex justify-center items-center">
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-auto object-cover rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
          />
        </div>

        {/* Thumbnail Gallery */}
        <div className="md:w-1/2 flex flex-col md:flex-row md:flex-wrap md:space-x-4 md:space-y-4 space-y-2">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Product Thumbnail ${index + 1}`}
              className="w-20 h-20 object-cover rounded-lg cursor-pointer transition duration-200 transform hover:scale-110"
              onClick={() => setMainImage(image)} // Set main image on thumbnail click
            />
          ))}
        </div>
      </div>

      {/* Product Details */}
      <div className="mt-6 md:mt-0 md:w-1/2">
        <h2 className="text-3xl font-semibold text-gray-800">{product.name}</h2>
        <p className="text-lg text-gray-600 mt-2">{product.description}</p>

        {/* Product Status */}
        <div className="text-xl text-green-500 mt-4">
          {product.inStock ? "In Stock" : "Out of Stock"}
        </div>

        {/* Quantity Control */}
        <div className="flex items-center space-x-4 mt-4">
          <button
            onClick={handleDecrement}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
          >
            <FaMinus />
          </button>
          <span className="text-lg font-semibold">{quantity}</span>
          <button
            onClick={handleIncrement}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
          >
            <FaPlus />
          </button>
        </div>

        {/* Product Price */}
        <div className="text-3xl font-bold text-gray-800 mt-4">
          ${product.price * quantity}
        </div>

        {/* Add to Cart Button */}
        <button className="flex items-center space-x-2 mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition">
          <FaShoppingCart />
          <span>Add to Cart</span>
        </button>
      </div>

      {/* Rating */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800">Rating:</h3>
        <div className="flex space-x-2 mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRating(star)}
              className={`${
                rating >= star ? "text-yellow-500" : "text-gray-400"
              }`}
            >
              <FaStar size={24} />
            </button>
          ))}
        </div>
      </div>

      {/* Review */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800">Write a Review:</h3>
        <textarea
          value={review}
          onChange={handleReviewChange}
          placeholder="Share your thoughts about this product..."
          className="w-full mt-2 p-4 border border-gray-300 rounded-lg"
          rows="4"
        />
        <button
          onClick={handleReviewSubmit}
          className="mt-4 bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
