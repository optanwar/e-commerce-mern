import React, { useEffect } from 'react';
import Rating from '@mui/material/Rating';
import { useSelector, useDispatch } from 'react-redux';
import  {fetchProducts } from "../../slices/productSlice";
import {Link} from 'react-router-dom';

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  console.log(products.products);
 
  return (
    <div className='bg-gray-100 min-h-screen py-10'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col md:flex-row gap-10'>
          
<div>
  <h1>Filters</h1>
  <div>
    <input type="text" placeholder='Search products...' name="search" className='border border-gray-300 font-roboto font-normal text-xs md:text-sm rounded-md outline-none px-2 py-2' />
  </div>
</div>
<div>
  <h1>Our Products</h1>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products && products?.products?.map((product) => (
            <div
              key={product._id}
              className="flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg w-full"
            >
              <div className="p-2.5 rounded-xl overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-md"
                />
              </div>
              <div className="p-4 flex flex-col h-full justify-between">
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <Link to={`/product/${product._id}`} className="">
                    <p className="text-slate-800 text-xl font-semibold">
                      {product.name}
                    </p>
                    </Link>
                    <p className="text-primary text-lg font-semibold">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Rating
                      name={`rating-${product._id}`}
                      value={product.ratings}
                      readOnly
                      precision={0.5}
                    />
                    <span className="text-sm text-slate-500">({product.numOfReviews
                    })</span>
                  </div>
                  <p className="text-slate-600 font-light leading-normal">
                    {product.description}
                  </p>
                </div>
                <button
                  className=" rounded-md bg-primary py-2 px-4 text-sm text-white shadow-md transition-all hover:bg-cyan-700 focus:bg-cyan-700"
                  type="button"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
</div>
        </div> 
      </div>
    </div>
  );
};

export default Products;
