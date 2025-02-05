import { useState } from "react";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Nike Air Max", price: 120, quantity: 1, image: "/images/shoe1.jpg" },
    { id: 2, name: "Adidas Ultraboost", price: 140, quantity: 1, image: "/images/shoe2.jpg" },
  ]);

  const updateQuantity = (id, amount) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="container max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-300">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-3">Shopping Cart</h2>
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
              <div className="flex-1 ml-4">
                <h3 className="text-lg font-semibold text-gray-700">{item.name}</h3>
                <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-200" onClick={() => updateQuantity(item.id, -1)}>-</button>
                <span className="w-8 text-center text-lg font-semibold">{item.quantity}</span>
                <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-200" onClick={() => updateQuantity(item.id, 1)}>+</button>
              </div>
              <button className="text-red-500 hover:text-red-700 ml-4" onClick={() => removeItem(item.id)}>
                <FaTrash className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-6 border-t pt-4">
          <span className="text-2xl font-semibold text-gray-800">Total: ${totalPrice.toFixed(2)}</span>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow-lg">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
