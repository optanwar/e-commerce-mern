import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/featuresSlice/productSlice';
import Loader from '../../layout/Loader';
import { FaHeart } from "react-icons/fa";
import Swal from 'sweetalert2';
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
const ProductSection = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  useEffect(() => {
    if (error) {
      // If there's an error, show the Swal alert and do not dispatch fetchProducts
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Ok'
  
      });
    } else {
     
      dispatch(fetchProducts());
    }
  }, [dispatch, error]);

  return (
    <>
      {
      loading ? <Loader/>: (
        <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 ">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Our Eco-Friendly Products
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mt-4">
              Discover our wide range of sustainable products that are good for you and the planet.
            </p>
          </div>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mx-auto ">
            {products && products?.products?.map((product) => (
              
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition duration-300 ease-in-out relative"
              >
                
                <div className="relative group">
                <Link
              to={`/product/${product._id}`}>
                <img
    src={`${product?.images?.[0]?.url}`} // Add a fallback URL
    alt={product?.images?.[0]?.public_id} // Add a fallback alt text
    className="w-full h-64 object-cover"
  /> </Link>
                  <button
                    className="absolute top-4 right-4 text-white bg-gray-800 bg-opacity-75 p-2 rounded-full hover:bg-red-600 transform transition duration-300 ease-in-out"
                  >
                    <FaHeart />
                  </button>
                </div>
               
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mt-2">{product.description}</p>
                  <div className="my-3 flex justify-start items-center gap-2">
                  <Rating value={product.ratings} readOnly defaultValue={2.5} precision={0.5} />
                  <p className="text-sm ">{`${product.ratings}`}</p>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-lg font-bold text-gray-900">
                      ${product.price}
                    </span>
                    <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-full text-sm transform transition duration-300 ease-in-out">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
         
            ))}
          </div>
        </div>
      </section>
      )
    }</>
  
  
  );
};

export default ProductSection;
