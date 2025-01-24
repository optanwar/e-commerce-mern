import React, { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { fetchProducts } from '../../slices/productSlice';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../layout/Loader';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const ProductList = ({ match }) => {
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.products);
  const query = match?.params?.query || '';

  // Fetch products on component mount or when query changes
  useEffect(() => {
    dispatch(fetchProducts(query));
  }, [dispatch, query]);

  // Handle error with SweetAlert
  useEffect(() => {
    if (error) {
      Swal.fire({
        title: "Error occurred!",
        text: error,
        icon: "error",
        confirmButtonText: "Retry",
      }).then(() => {
        dispatch(fetchProducts(query));
      });
    }
  }, [error, dispatch, query]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    alert(`${product.name} has been added to your cart!`);
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 via-purple-200 to-pink-300 py-16 md:py-24 lg:py-32 xl:py-40 min-h-screen">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12 tracking-wide">
          Our Stunning Products
        </h2>
        {loading ? (
          <Loader />
        ) : (
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products?.products?.length > 0 ? (
              products.products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform"
                >
                  <div className="relative">
                    <Link to={`/product/${product._id}`} state={{ id: product._id }}>
                      <img
                        src={product.images[0].url}
                        alt={product.name}
                        className="w-full h-64 object-cover transition-transform duration-500 ease-in-out transform hover:scale-105 cursor-pointer"
                      />
                    </Link>
                    {/* Discount Tag */}
                    {product.discount ? (
                      <span className="absolute top-3 left-3 bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-full">
                        {product.discount}% OFF
                      </span>
                    ) : null}
                  </div>
                  <div className="p-6 space-y-4">
                    <Link to={`/product/${product._id}`} state={{ id: product._id }}>
                      <h3 className="text-2xl font-semibold text-gray-800 hover:text-indigo-600 transition-all">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-lg text-gray-600 font-semibold">
                      ${product.price.toFixed(2)}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center">
                      <ReactStars
                        count={5}
                        value={product.ratings}
                        size={24}
                        isHalf={true}
                        edit={false}
                        activeColor="#fbbf24"
                      />
                      <span className="text-gray-500 ml-2">
                        ({product.numOfReviews} Reviews)
                      </span>
                    </div>

                    <div className="mt-6 flex justify-between items-center">
                      {/* Add to Cart Button */}
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-6 rounded-lg text-sm font-semibold hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-700 transition-all"
                      >
                        Add to Cart
                      </button>

                      {/* View Details Button */}
                      <Link
                        to={`/product/${product._id}`}
                        state={{ id: product._id }}
                        className="bg-transparent border-2 border-blue-600 text-blue-600 py-2 px-6 rounded-lg text-sm font-semibold hover:bg-blue-600 hover:text-white transition-all"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 col-span-full">
                No products found.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
