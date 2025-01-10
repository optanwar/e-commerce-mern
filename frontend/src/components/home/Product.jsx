import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/slice/productSlice';
import { FaHeart } from "react-icons/fa";

const ProductSection = () => {
  const products = [
    {
      id: 1,
      name: "Eco-Friendly Water Bottle",
      price: "$25.99",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
      description:
        "Reusable water bottle made from sustainable materials.",
    },
    {
      id: 2,
      name: "Organic Cotton T-shirt",
      price: "$19.99",
      image:
        "https://plus.unsplash.com/premium_photo-1679913792906-13ccc5c84d44?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
      description:
        "T-shirt made from 100% organic cotton for comfort and eco-friendliness.",
    },
    {
      id: 3,
      name: "Bamboo Toothbrush Set",
      price: "$15.49",
      image:
        "https://plus.unsplash.com/premium_photo-1718913936342-eaafff98834b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
      description:
        "Biodegradable toothbrushes for reducing plastic waste.",
    },
    {
      id: 4,
      name: "Recycled Paper Notebook",
      price: "$12.99",
      image:
        "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
      description:
        "Notebook made from 100% recycled paper.",
    },
    {
      id: 5,
      name: "Eco-Friendly Shopping Bag",
      price: "$9.99",
      image:
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
      description:
        "Reusable shopping bag made from durable recycled materials.",
    },
    {
      id: 6,
      name: "Solar Powered Charger",
      price: "$29.99",
      image:
        "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
      description:
        "Charge your devices with renewable energy using this solar-powered charger.",
    },
    {
      id: 7,
      name: "Compostable Coffee Cups",
      price: "$14.99",
      image:
        "https://plus.unsplash.com/premium_photo-1664392147011-2a720f214e01?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
      description:
        "Set of 12 compostable coffee cups for guilt-free coffee breaks.",
    },
    {
      id: 8,
      name: "Recycled Plastic Sunglasses",
      price: "$39.99",
      image:
        "https://images.unsplash.com/photo-1503602642458-232111445657?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
      description:
        "Stylish sunglasses made from recycled plastic to reduce waste.",
    },
  ];


  const dispatch = useDispatch();
  const {data , loading , error} = useSelector((state) => state);
console.log(data?.products,5454)
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Our Eco-Friendly Products
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mt-4">
            Discover our wide range of sustainable products that are good for you and the planet.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition duration-300 ease-in-out relative"
            >
              <div className="relative group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
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
                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-bold text-gray-900">
                    {product.price}
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
  );
};

export default ProductSection;
