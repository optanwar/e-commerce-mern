import React, { useState } from "react";
import { FaStar, FaShoppingCart, FaMinus, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";

const ProductDetails = () => {
  // Dummy Product Data
  const product = {
    name: "Amazing Product",
    images: [
      "https://via.placeholder.com/600x600/FF6347",
      "https://via.placeholder.com/600x600/FFD700",
      "https://via.placeholder.com/600x600/008080",
      "https://via.placeholder.com/600x600/8A2BE2",
    ],
    description:
      "This is an amazing product that will solve all your problems. It is of the highest quality and comes with a satisfaction guarantee.",
    price: 49.99,
    inStock: true,
    rating: 4,
    reviewsCount: 125,
  };

  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product.images[0]); // Set the first image as the main image
  const [review, setReview] = useState("");

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
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
    <div className="bg-gray-50 py-12 md:py-24 lg:py-32  xl:py-36"> {/* Added pt-24 to offset navbar */}
      <div className="container mx-auto px-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden md:flex md:flex-row flex-col">
          {/* Product Image */}
          <div className="md:w-1/2 flex justify-center p-6">
            <div className="relative w-full h-full max-w-md">
              <img
                src={mainImage}
                alt="Product"
                className="w-full h-full object-cover rounded-lg transition-transform duration-300 transform hover:scale-105"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="md:w-1/2 p-6 flex flex-col justify-between">
            <h2 className="text-3xl font-semibold text-gray-800">{product.name}</h2>
            <p className="text-gray-600 mt-2">{product.description}</p>

            {/* Price */}
            <div className="text-2xl font-semibold text-gray-900 mt-4">
              ${product.price}
            </div>

            {/* Rating */}
            <div className="flex items-center mt-2">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  size={20}
                  color={index < product.rating ? "#FFD700" : "#E0E0E0"}
                />
              ))}
              <span className="text-gray-600 ml-2">
                {product.rating} ({product.reviewsCount} reviews)
              </span>
            </div>

            {/* Stock Status */}
            <div className="mt-4 text-lg font-medium text-green-600">
              {product.inStock ? "In Stock" : "Out of Stock"}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4 mt-6">
              <button
                onClick={handleDecrement}
                className="bg-gray-200 p-2 rounded-full"
              >
                <FaMinus />
              </button>
              <span className="text-lg font-medium">{quantity}</span>
              <button
                onClick={handleIncrement}
                className="bg-gray-200 p-2 rounded-full"
              >
                <FaPlus />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button className="mt-6 bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition">
              <FaShoppingCart className="inline mr-2" />
              Add to Cart
            </button>

            {/* Product Image Thumbnails */}
            <div className="mt-6 flex space-x-4">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="Product Thumbnail"
                  className="w-16 h-16 object-cover rounded-lg cursor-pointer"
                  onClick={() => setMainImage(image)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12 bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-2xl font-semibold text-gray-800">Write a Review</h3>
          <textarea
            value={review}
            onChange={handleReviewChange}
            placeholder="Share your thoughts about this product..."
            className="w-full mt-4 p-4 border border-gray-300 rounded-lg"
            rows="4"
          />
          <button
            onClick={handleReviewSubmit}
            className="mt-4 bg-yellow-500 text-white py-3 px-6 rounded-lg hover:bg-yellow-600 transition"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
