import React from "react";
import ReactStars from "react-rating-stars-component";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "High-quality sound with advanced noise cancellation.",
    price: "$199",
    image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Smartwatch",
    description: "Track your fitness and stay connected.",
    price: "$149",
    image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.0,
  },
  {
    id: 3,
    name: "Gaming Mouse",
    description: "Precision and speed for gaming enthusiasts.",
    price: "$59",
    image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Laptop Backpack",
    description: "Stylish and spacious with padded compartments.",
    price: "$79",
    image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 3.8,
  },
];

const ProductSection = () => {
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

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              {/* Product Image */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover"
              />
              {/* Product Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-500 mt-2">{product.description}</p>
                <p className="text-lg font-semibold text-yellow-500 mt-4">{product.price}</p>
                
                {/* Rating Component */}
                <div className="flex items-center mt-4">
                  <ReactStars
                    count={5}
                    value={product.rating}
                    isHalf={true}
                    size={24}
                    edit={false}
                    activeColor="#fbbf24"
                  />
                  <span className="ml-2 text-sm text-gray-500">{product.rating}</span>
                </div>

                <button className="mt-6 w-full bg-yellow-500 text-white font-bold py-2 rounded-full shadow-md hover:bg-yellow-400 transition-all duration-300">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
