import React, { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { fetchProducts } from '../../slices/productSlice';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../layout/Loader'
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";

const ProductList = () => {
  const [cart, setCart] = useState([]);

  const dispatch = useDispatch();
  // Get products, loading, and error states from Redux store
  const { products, loading, error } = useSelector((state) => state.products);

  // Dispatch the fetchProducts action when the component mounts
  useEffect(() => {
    dispatch(fetchProducts());

    if (error) {
      // Show sweet alert when there is an error
      Swal.fire({
        title: "Error occurred!",
        text: error,
        icon: "error",
        draggable: true,
      }).then(() => {
        // Dispatch to fetch products after the alert is closed
        dispatch(fetchProducts());
      });
    }
  }, [dispatch, error]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    alert(`${product.name} has been added to your cart!`);
  };

  return (
    <div className="bg-gray-100 py-16 md:py-24 lg:py-32 xl:py-40">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
          Explore Our Products
        </h2>
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.products &&
                products.products.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <img
                      src={product.images[0].url}
                      alt={product.name}
                      className="w-full h-56 object-cover transition-transform duration-300 ease-in-out"
                    />
                    <div className="p-6">
                      <Link to={`/product/${product._id}`} state={{ id: product._id }}>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2 hover:text-yellow-600 transition-all">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-gray-600 text-lg font-medium">{product.price}</p>

                      {/* Rating */}
                      <div className="mt-3">
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

                      <div className="mt-5 flex justify-between items-center">
                        {/* Add to Cart Button */}
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all"
                        >
                          Add to Cart
                        </button>

                        {/* View Details Button */}
                        <Link
                          to={`/product/${product._id}`}
                          state={{ id: product._id }}
                          className="bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-all"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductList;
