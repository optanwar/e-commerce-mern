import React, { useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import {fetchProducts} from '../../slices/productSlice';
import {useSelector, useDispatch} from 'react-redux';
import Loader from '../../layout/Loader'
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import { addToCart } from '../../slices/cartSlice'; // Adjust path if needed
const ProductSection = () => {
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
}, [dispatch, error]); // Only run when `error` changes


  return (
    <section id="products" className="bg-gray-100 py-16">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 leading-tight tracking-wide">
            Our Featured <span className="text-yellow-500">Products</span>
          </h2>
          <p className="text-lg text-gray-600 mt-4">
            Discover premium-quality products tailored for you.
          </p>
        </div>


{
  loading ? <Loader/>:<>
   {/* Product Grid */}
   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.products && products.products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              {/* Product Image */}
              <Link to={`/product/${product._id}`}  state={{ id: product._id }}>
              <img
                src={product.images[0].url}
                alt={product.name}
                className="w-full h-56 object-cover"
              />
              </Link>
              {/* Product Details */}
              <div className="p-6">
              <Link to={`/product/${product._id}`}  state={{ id: product._id }}>
              <h3 className="text-xl font-bold text-gray-900 hover:text-yellow-400 transition-all duration-300">{product.name}</h3></Link>
    
                <p className="text-sm text-gray-500 mt-2">{product.description}</p>
                <p className="text-lg font-semibold text-yellow-500 mt-4">{product.price} $</p>
                
                {/* Rating Component */}
                <div className="flex items-center mt-4">
                  <ReactStars
                    count={5}
                    value={product.ratings}
                    isHalf={true}
                    size={24}
                    edit={false}
                    activeColor="#fbbf24"
                  />
                  <div>

                  <span className="ml-2 text-sm text-gray-500">{product.ratings}</span>
                  <span className="ml-2 text-sm text-gray-500">({product.numOfReviews} Reviews)</span>
                  </div>
                </div>

                <button onClick={() => dispatch(addToCart(product))}  className="mt-6 w-full bg-yellow-500 text-white font-bold py-2 rounded-full shadow-md hover:bg-yellow-400 transition-all duration-300">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
  </>
}
       
      </div>
    </section>
  );
};

export default ProductSection;
