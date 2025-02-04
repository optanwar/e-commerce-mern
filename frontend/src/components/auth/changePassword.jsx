import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../slices/authSlice"; 
import { FiEye, FiEyeOff, FiArrowLeft, FiLock } from "react-icons/fi";

const ChangePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user); // Get token from Redux store

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 

    if (form.newPassword !== form.confirmPassword) {
      setError("New Password and Confirm Password do not match!");
      return;
    }

    if (!token) {
      setError("Unauthorized: Please log in again.");
      return;
    }

    try {
      const response = await dispatch(changePassword(form)).unwrap();
      setSuccess(response.message || "Password updated successfully!");
      setTimeout(() => navigate("/account"), 1500);
    } catch (err) {
      setError(err.message || "Failed to update password.");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-2xl p-8">
        
        <button
          onClick={() => navigate("/account")}
          className="flex items-center text-gray-600 hover:text-gray-800 transition mb-6"
        >
          <FiArrowLeft className="mr-2" /> Back to Account
        </button>

        <div className="text-center">
          <div className="w-16 h-16 mx-auto flex items-center justify-center bg-blue-500 text-white rounded-full">
            <FiLock size={30} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mt-4">Change Password</h2>
          <p className="text-gray-500 text-sm">Update your password to keep your account secure</p>
        </div>

        {error && <p className="text-red-500 text-center mt-3">{error}</p>}
        {success && <p className="text-green-500 text-center mt-3">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-5 mt-6">
          {["oldPassword", "newPassword", "confirmPassword"].map((field, index) => (
            <div key={index}>
              <label className="text-gray-700 font-medium block mb-1">
                {field === "oldPassword" ? "Current Password" : field === "newPassword" ? "New Password" : "Confirm Password"}
              </label>
              <div className="relative">
                <input
                  type={showPassword[field] ? "text" : "password"}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-4 flex items-center text-gray-500"
                  onClick={() => togglePassword(field)}
                >
                  {showPassword[field] ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
          ))}

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
