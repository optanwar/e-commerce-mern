import React, { useEffect, useState } from "react";
import { FaStar, FaShoppingCart, FaMinus, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "../../slices/productSlice";
import { useParams, useLocation } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import Loader from "../../layout/Loader";
import MetaData from "../../layout/MetaData";

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(""); // Correctly initialize as a string
  const [review, setReview] = useState("");
  const { id } = location.state || {};
  const { productDetails, loading, error } = useSelector((state) => state.products);

  const product = productDetails?.product || {}; // Safely access product

  useEffect(() => {
    if (error) {
      // Show sweet alert when there is an error
      Swal.fire({
        title: "Error occurred!",
        text: error,
        icon: "error",
        draggable: true,
      });
    }

    if (id) {
      dispatch(fetchProductDetails(id)); // Ensure id is valid
    }
  }, [dispatch, id, error]);

  useEffect(() => {
    if (product?.images?.length) {
      setMainImage(product.images[0].url); // Set the first image URL as the default
    }
  }, [product]);

  const handleIncrement = () => setQuantity((prev) => prev + 1);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleReviewChange = (e) => setReview(e.target.value);

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
    }
  };

  return (
    <>
       <MetaData title={product.name || "Ecommerce Website"}/>
      {loading ? <Loader /> : (
      
        <div className="bg-gradient-to-r from-blue-100 via-purple-200 to-pink-300 py-12 md:py-24 lg:py-32 xl:py-36">
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
              <div className="md:w-1/2 p-6 py-10 md:py-14 lg:py-20 flex flex-col justify-between">
                <h2 className="text-3xl font-semibold text-gray-800">{product.name || "Product Name"}</h2>
                <p className="text-gray-600 mt-2">{product.description || "No description available."}</p>

                {/* Price */}
                <div className="text-2xl font-semibold text-gray-900 mt-4">
                  {product.price ? `$${product.price}` : "N/A"}
                </div>

                {/* Rating */}
                <div className="flex items-center mt-2">
                  <ReactStars
                    count={5}
                    value={product.ratings || 0}
                    isHalf={true}
                    size={24}
                    edit={false}
                    activeColor="#fbbf24"
                  />
                  <span className="text-gray-600 ml-2">
                    {product.numOfReviews || 0} reviews
                  </span>
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
                  {product.images?.map((image, index) => (
                    <img
                      key={index}
                      src={image.url}
                      alt="Product Thumbnail"
                      className="w-16 h-16 object-cover rounded-lg cursor-pointer"
                      onClick={() => setMainImage(image.url)} // Correctly set the URL
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
      )}
    </>
  );
};

export default ProductDetails;
