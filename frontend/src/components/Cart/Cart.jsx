import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from '../../slices/cartSlice';
import { IoClose } from 'react-icons/io5';

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, totalPrice, totalQuantity } = useSelector((state) => state.cart);
  console.log(totalPrice, "cartItems")

  const handleQuantityChange = (productId, newQty) => {
    if (newQty > 0) {
      dispatch(updateQuantity({ productId, quantity: newQty }));
    }
  };

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-md shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Shopping Cart</h2>
          {cartItems.length > 0 && (
            <button
              onClick={handleClearCart}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Clear Cart
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center py-12">Your cart is currently empty.</p>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.product.productId}
                className="flex flex-col md:flex-row items-center justify-between gap-4 border-b pb-4"
              >
                <div className="flex items-center gap-4 w-full md:w-2/3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div>
                    <h4 className="text-lg font-medium">{item.product.name}</h4>
                    <p className="text-gray-500">${item.product.price ? item.product.price.toFixed(2) : '0.00'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                    className="bg-gray-200 w-8 h-8 flex items-center justify-center rounded hover:bg-gray-300"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                    className="bg-gray-200 w-8 h-8 flex items-center justify-center rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <p className="font-semibold">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleRemove(item.productId)}
                    className="text-red-500 hover:text-red-700"
                    title="Remove item"
                  >
                    <IoClose size={20} />
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center pt-6 border-t mt-6">
              <div className="text-lg font-medium">Total ({totalQuantity} items)</div>
              <div className="text-xl font-bold text-cyan-600">
                ${totalPrice.toFixed(2)}
              </div>
            </div>

            <div className="text-right">
              <button className="bg-cyan-600 text-white px-6 py-2 rounded-md hover:bg-cyan-700 transition">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
