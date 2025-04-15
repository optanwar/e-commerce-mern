import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Rating from '@mui/material/Rating';

const ProductsDetails = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-10">
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel
              sapien nec leo cursus dignissim in nec augue.
            </p>
            <p className="text-xl font-bold text-primary mb-6">$99.99</p>
            <div className='flex items-center  justify-start gap-2 md:gap-4  lg:gap-5 mb-4'>
              <div className='flex items-center gap-2  mb-2'>
                <span>{4.5}</span><Rating
                      name={`hello`}
                      value={3}
                      readOnly
                      precision={0.5}
                    />
              </div>
              <div className='flex items-center gap-2 mb-2'>
              <p>719K Units sold</p>
              <p>1.9K Reviewed</p>
              </div>
           

            </div>

            <button className="bg-primary text-white px-6 py-2 rounded-md hover:bg-cyan-700 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetails;
