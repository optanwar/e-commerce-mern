import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../slices/cartSlice';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  return (
    <div className="h-screen flex flex-col justify-between bg-gray-100">
      <div className="container mx-auto py-8 md:py-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <p className="text-xl text-center text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-6">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                  <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="text-lg text-gray-700">${item.price}</p>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                      className="px-2 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="text-lg">{item.quantity}</span>
                    <button
                      onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                      className="px-2 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-500 font-semibold hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="container mx-auto pb-8">
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
          <span className="text-xl font-bold text-gray-800">Total:</span>
          <p className="text-2xl text-gray-800">${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
