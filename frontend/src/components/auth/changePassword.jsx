import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiArrowLeft, FiLock } from "react-icons/fi";

const ChangePassword = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      setError("New Password and Confirm Password do not match!");
      return;
    }

    setError("");
    console.log("Password changed successfully!");
    navigate("/account"); // Redirect back to account page
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-2xl p-8">
        
        {/* Back Button */}
        <button
          onClick={() => navigate("/account")}
          className="flex items-center text-gray-600 hover:text-gray-800 transition mb-6"
        >
          <FiArrowLeft className="mr-2" /> Back to Account
        </button>

        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 mx-auto flex items-center justify-center bg-blue-500 text-white rounded-full">
            <FiLock size={30} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mt-4">Change Password</h2>
          <p className="text-gray-500 text-sm">Update your password to keep your account secure</p>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mt-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5 mt-6">
          
          {/* Current Password */}
          <div>
            <label className="text-gray-700 font-medium block mb-1">Current Password</label>
            <div className="relative">
              <input
                type={showPassword.current ? "text" : "password"}
                name="currentPassword"
                value={form.currentPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-4 flex items-center text-gray-500"
                onClick={() => togglePassword("current")}
              >
                {showPassword.current ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="text-gray-700 font-medium block mb-1">New Password</label>
            <div className="relative">
              <input
                type={showPassword.new ? "text" : "password"}
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-4 flex items-center text-gray-500"
                onClick={() => togglePassword("new")}
              >
                {showPassword.new ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-gray-700 font-medium block mb-1">Confirm Password</label>
            <div className="relative">
              <input
                type={showPassword.confirm ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-4 flex items-center text-gray-500"
                onClick={() => togglePassword("confirm")}
              >
                {showPassword.confirm ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-3 rounded-lg hover:bg-blue-600 transition duration-300 shadow-md"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
