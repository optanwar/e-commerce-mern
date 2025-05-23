import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails , getMyOrders  } from '../../slices/orderSlice'; // adjust path if needed
import { Link } from 'react-router-dom';

const MyOrder = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { loading, error, orderDetails , myOrders} = useSelector((state) => state.order);
  console.log(myOrders.orders,55)

  useEffect(() => {
    // Example orderId, you can map through user's orders if you fetch them all
    dispatch(getMyOrders());
  }, [dispatch, token]);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {loading ? (
        <div className="text-center py-10">Loading orders...</div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <div className="space-y-6">
          {myOrders?.orders?.map((order) => (
            <div key={order._id} className="border rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="text-sm text-gray-600">Order ID:</p>
                  <p className="font-semibold">{order._id}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Date:</p>
                  <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Total Amount:</p>
                  <p className="font-semibold">${(order.totalPrice / 100).toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status:</p>
                  <span
                    className={`px-2 py-1 rounded text-sm font-medium ${
                      order.orderStatus
 === 'Delivered'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-yellow-100 text-yellow-600'
                    }`}
                  >
                    {order.orderStatus
}
                  </span>
                </div>
              </div>


              <div className="mt-4 text-right">
                <Link
                  to={`/order/${order._id}`}
                  className="inline-block text-sm text-blue-600 hover:underline"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrder;
