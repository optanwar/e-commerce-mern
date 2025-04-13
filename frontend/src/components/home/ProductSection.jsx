import React from 'react';
import Rating from '@mui/material/Rating';



const ProductSection = () => {
  return (
    <div className="bg-[#EDF7FF]">
      <div className="container px-6 py-16 md:py-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <h2 className="font-roboto text-2xl font-bold text-gray-800">Featured Products</h2>
          <button className="font-roboto text-base text-primary hover:underline">All Products</button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {/* Product Card */}
          <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
  <div className="relative p-2.5 h-96 overflow-hidden rounded-xl bg-clip-border">
    <img
      src="../../../public/soothing_vapor_bath_400ml_381371177257_0.jpeg"
      alt="card-image"
      className="h-full w-full object-cover rounded-md"
    />
  </div>
  <div className="p-4">
    <div className="mb-2 flex items-center justify-between">
      <p className="text-slate-800 text-xl font-semibold">
        Product Name
      </p>
      <p className="text-primary text-lg font-semibold">
        $95.00 
      </p>
    </div>
    <div className='flex items-center justify-start gap-2 mb-2'>

    <Rating
  name="text-feedback"
  value={4.5}
  readOnly
  precision={0.5}
 /> (20)
    </div>
    <p className="text-slate-600 leading-normal font-light">
     Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore blanditiis facere dolorum eligendi a dolorem at perferendis eaque dolore accusantium?
    </p>
    <button className="rounded-md w-full mt-6 bg-primary py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-cyan-700 focus:shadow-none active:bg-cyan-700 hover:bg-cyan-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
    Buy Now
    </button>
  </div>
</div>

          {/* Repeat Product Card as needed */}
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
