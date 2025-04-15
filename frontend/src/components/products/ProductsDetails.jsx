import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Rating from '@mui/material/Rating';
import Slider from '@mui/material/Slider';
import { IoStar } from "react-icons/io5";

const ProductsDetails = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-10 md:py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Image Gallery */}
          <div className="w-full lg:w-1/2">
            <Swiper
              loop={true}
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mb-4"
            >
              {Array.from({ length: 10 }, (_, i) => (
                <SwiperSlide key={i}>
                  <img
                    src={`https://swiperjs.com/demos/images/nature-${i + 1}.jpg`}
                    alt={`Nature ${i + 1}`}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <Swiper
              onSwiper={setThumbsSwiper}
              loop={true}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mt-2"
            >
              {Array.from({ length: 10 }, (_, i) => (
                <SwiperSlide key={i}>
                  <img
                    src={`https://swiperjs.com/demos/images/nature-${i + 1}.jpg`}
                    alt={`Thumb ${i + 1}`}
                    className="h-20 w-full object-cover rounded-md cursor-pointer"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Product Name</h2>
            <p className="text-gray-600 mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam exercitationem nobis sequi voluptatum...
            </p>
            <p className="text-xl font-bold text-primary mb-6">
              $99.99 <span className="line-through ml-2 text-gray-500">$149.99</span>
              <span className="ml-2 bg-primary text-white text-xs rounded-lg py-1 px-1.5">7% off</span>
            </p>
            <div className="flex items-center justify-start gap-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{4.5}</span>
                <Rating name="product-rating" value={4.5} readOnly precision={0.5} />
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <p>719K Units sold</p>
                <p>1.9K Reviewed</p>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <button className="bg-gray-200 px-2 py-1 rounded">-</button>
              <span className="text-lg">1</span>
              <button className="bg-gray-200 px-2 py-1 rounded">+</button>
            </div>

            <button className="bg-primary text-white px-6 py-2 rounded-md hover:bg-cyan-700 transition">
              Add to Cart
            </button>
          </div>
        </div>

        {/* Details Section */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 mt-16">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Details</h2>
            <p className="text-gray-600 text-base leading-relaxed mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. At nemo quae exercitationem unde...
            </p>
            <p className="text-gray-600 text-base leading-relaxed">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore a, maiores quibusdam...
            </p>
          </div>
          <div className="md:w-1/2">
            <img
              src="/inside.avif"
              alt="Product inside"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>

        {/* How to Use Section */}
        <div className="flex flex-col  md:flex-row  items-start justify-between gap-10 mt-16">
          <div className="md:w-1/2 order-2 md:order-1">
            <img
              src="/inside.avif"
              alt="How to use"
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="md:w-1/2 order-1 md:order-2">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How to use</h2>
            <p className="text-gray-600 text-base leading-relaxed mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. At nemo quae exercitationem unde...
            </p>
            <p className="text-gray-600 text-base leading-relaxed">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore a, maiores quibusdam...
            </p>
          </div>
        </div>


        <div>
          <div className='flex flex-col  items-center justify-center gap-1 mt-16'>

          <p>Reviews</p>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Happy Kids, Honest Reviews</h2>
          </div>
          <div className='flex flex-col md:flex-row items-center justify-between gap-10 mt-16'>
            <div className='flex flex-col justify-center items-center gap-1'>
              
<h3 className='flex items-center justify-start gap-1'>4.5 <IoStar size={24} color='gold' /></h3>
<h3>Review</h3>
            </div>
            <div className='w-full'>
            <div className='flex items-center justify-start gap-1'>
             <span className='flex items-center justify-start gap-1'>5<IoStar color='gold'/></span>
            <Slider
        size="small"
        defaultValue={70}
        aria-label="Small"
         disabled
     
        valueLabelDisplay="auto"
      />
      <span>100</span>
            </div>
            <div className='flex items-center justify-start gap-1'>
             <span className='flex items-center justify-start gap-1'>4<IoStar color='gold'/></span>
            <Slider
        size="small"
        defaultValue={13}
        aria-label="Small"
        valueLabelDisplay="auto"
      />
      <span>13</span>
            </div>
            <div className='flex items-center justify-start gap-1'>
             <span className='flex items-center justify-start gap-1'>3<IoStar color='gold'/></span>
            <Slider
        size="small"
        defaultValue={9}
        aria-label="Small"
        valueLabelDisplay="auto"
      />
      <span>8</span>
            </div>
            <div className='flex items-center justify-start gap-1'>
             <span className='flex items-center justify-start gap-1'>2<IoStar color='gold'/></span>
            <Slider
        size="small"
        defaultValue={7}
        aria-label="Small"
        valueLabelDisplay="auto"
      />
      <span>2</span>
            </div>
            <div className='flex items-center justify-start gap-1'>
             <span className='flex items-center justify-start gap-1'>1<IoStar color='gold'/></span>
            <Slider
        size="small"
        defaultValue={2}
        aria-label="Small"
        valueLabelDisplay="auto"
      />
      <span>2</span>
            </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetails;
