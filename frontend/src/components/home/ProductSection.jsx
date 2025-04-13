import React from 'react';

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
          <div className="bg-white shadow-lg rounded-lg p-6">
            <img
              src="/soothing_vapor_bath_400ml_381371177257_0.jpeg"
              alt="Product"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="font-roboto text-lg font-semibold text-gray-800">Product Name</h3>
            <p className="font-roboto text-gray-600 mt-2">Short description of the product.</p>
            <button className="font-roboto mt-4 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded">
             Buy Now
            </button>
          </div>

          {/* Repeat Product Card as needed */}
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
