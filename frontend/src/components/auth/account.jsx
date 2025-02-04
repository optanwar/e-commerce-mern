import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../slices/authSlice";
import { FiLogOut, FiLock, FiShoppingBag } from "react-icons/fi"; // Added My Orders icon

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Fetch user data from Redux store
  const { user } = useSelector((state) => state.user);



  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="max-w-lg w-full bg-white shadow-xl rounded-xl p-6">
        
        {/* Profile Header */}
        <div className="text-center">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="w-24 h-24 mx-auto rounded-full border-4 border-gray-200"
          />
          <h2 className="mt-4 text-2xl font-semibold text-gray-700">{user.user?.name || "John Doe"}</h2>
          <p className="text-gray-500">{user.user?.email || "johndoe@example.com"}</p>
        </div>

        {/* User Info */}
        <div className="mt-6 border-t border-gray-200 pt-4">
          <h3 className="text-lg font-semibold text-gray-700">Account Details</h3>
          <div className="mt-2">
            <p className="text-gray-600"><strong>Name:</strong> {user.user?.name || "John Doe"}</p>
            <p className="text-gray-600"><strong>Email:</strong> {user.user?.email || "johndoe@example.com"}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-4">
          {/* My Orders Button */}
          <button
            onClick={() => navigate("/orders")}
            className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition duration-300"
          >
            <FiShoppingBag className="mr-2 text-lg" /> My Orders
          </button>

          {/* Change Password Button */}
          <button
            onClick={() => navigate("/change-password")}
            className="flex-1 flex items-center justify-center px-4 py-2 bg-yellow-500 text-white font-medium rounded-lg hover:bg-yellow-600 transition duration-300"
          >
            <FiLock className="mr-2 text-lg" /> Change Password
          </button>
        </div>

        {/* Logout Button */}
        <div className="mt-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition duration-300"
          >
            <FiLogOut className="mr-2 text-lg" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
