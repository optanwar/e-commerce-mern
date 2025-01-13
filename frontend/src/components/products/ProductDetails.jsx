import React, { useState, useEffect} from "react";

import { useDispatch, useSelector } from 'react-redux';
import { productDetails } from '../../redux/featuresSlice/productSlice';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Rating from "@mui/material/Rating";
import Slider from "react-slick";
import Loader from '../../layout/Loader';
import Swal from 'sweetalert2'
import { useParams } from "react-router-dom";
const ProductDetails = () => {
  
    const { id } = useParams(); // Get the product ID from the URL
    const dispatch = useDispatch();
  
  const [quantity, setQuantity] = useState(1);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const mainCarouselSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // Disable arrows
  };
  
  const thumbnailCarouselSettings = {
    slidesToShow: 4, // Display 4 thumbnails
    slidesToScroll: 0, // Prevent scrolling
    focusOnSelect: true, // Allow selection by clicking on thumbnails
    infinite: false, // Disable infinite scrolling
    arrows: false, // Disable arrows
    speed: 500,
  };


  // Access state from the Redux store
  const { product, loading, error } = useSelector((state) => state.products);
  useEffect(() => {
      
    if (error) {
      // Show an error alert using Swal
      Swal.fire({
        title: 'Error!',
        text: error,
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } else {
      // Fetch product details if there's no error
      dispatch(productDetails(id));
    }
  }, [dispatch, id, error]);
  
 

console.log(product?.product)

  return (
    <>{
        loading ? <Loader/>:( <div className="bg-gray-100 min-h-screen py-10">
       
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Product Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Image Carousel */}
                <div className="bg-white rounded-lg shadow-lg">
                  <Slider
                    {...mainCarouselSettings}
                    asNavFor={nav2}
                    ref={(slider) => setNav1(slider)}
                  >
                    {product?.product?.images.map((photo) => (
                      <div key={photo._id}>
                        <img
                          src={photo.url}
                          alt={photo.url}
                          className="w-full h-96 object-cover rounded-lg"
                        />
                      </div>
                    ))}
                  </Slider>
      
                  {/* Thumbnail Carousel */}
                  <Slider
                    {...thumbnailCarouselSettings}
                    asNavFor={nav1}
                    ref={(slider) => setNav2(slider)}
                    className="mt-4"
                  >
                    {product?.product?.images.map((photo, index) => (
                      <div key={photo._id} className="px-2">
                        <img
                           src={photo.url}
                           alt={photo.url}
                          className="w-full h-20 object-cover rounded-lg cursor-pointer border border-gray-200 hover:border-blue-500"
                        />
                      </div>
                    ))}
                  </Slider>
                </div>
      
                {/* Product Details */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h1 className="text-3xl font-bold text-gray-800 mb-4">
                 { product?.product?.name}
                  </h1>
                  <p className="text-gray-600 mb-4">
             {     product?.product?.description}
                  </p>
                  <p className="text-2xl font-bold text-blue-600 mb-4">{`${product?.product?.price} $`}</p>
                  <div className="mb-6 flex justify-start items-center gap-2">
                  <Rating value={product?.product?.ratings} readOnly defaultValue={2.5} precision={0.5} />
                  <p className="text-sm ">{`${product?.product?.ratings}`}</p>
                  </div>
                  <p className="text-2xl font-bold text-blue-600 mb-4">{`${product?.product?.price} $`}</p>
      
                  {/* Quantity Selector */}
                  <div className="flex items-center gap-6 mb-8">
                    <h3 className="text-lg font-medium text-gray-800">Quantity:</h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleDecrement}
                        className="w-10 h-10 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-200"
                      >
                        -
                      </button>
                      <span className="text-xl font-medium text-gray-800">
                        {quantity}
                      </span>
                      <button
                        onClick={handleIncrement}
                        className="w-10 h-10 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                  </div>
      
                  {/* Add to Cart */}
                  <button className="w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600">
                    Add to Cart
                  </button>
      
                  {/* Highlights */}
                  <div className="mt-8 border-t pt-6">
                    <h3 className="text-xl font-medium text-gray-800 mb-4">
                      Product Highlights
                    </h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                      <li>High-quality sound with noise cancellation</li>
                      <li>Lightweight and comfortable design</li>
                      <li>40-hour battery life</li>
                      <li>Bluetooth 5.0 for seamless connectivity</li>
                      <li>One-year warranty</li>
                    </ul>
                  </div>
                </div>
              </div>
      
              {/* Reviews Section */}
              <div className="mt-16">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Customer Reviews
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {product?.product?.reviews.map((review) => (
                    <div
                      key={review._id}
                      className="bg-white p-6 rounded-lg shadow-lg space-y-4"
                    >
                      <div className="flex items-center gap-2">
                      <Rating value={review.rating} readOnly />
                        <p className="font-medium text-gray-800">{review.name}</p>
                      </div>
                      <p className="text-gray-600">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>)
    }
    </>
   
  );
};

export default ProductDetails;
