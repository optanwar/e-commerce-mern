import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiCamera, FiArrowLeft, FiSave } from "react-icons/fi";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    profileImage: user?.profileImage || "https://via.placeholder.com/100",
  });

  const [imagePreview, setImagePreview] = useState(form.profileImage);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setForm({ ...form, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile:", form);
    navigate("/account"); // Redirect to account page after update
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-gray-100 to-gray-300 px-4">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-2xl p-8">
        
        {/* Back Button */}
        <button
          onClick={() => navigate("/account")}
          className="flex items-center text-gray-600 hover:text-gray-800 transition mb-6"
        >
          <FiArrowLeft className="mr-2" /> Back to Account
        </button>

        {/* Profile Image Upload */}
        <div className="relative w-24 h-24 mx-auto mb-4">
          <img
            src={imagePreview}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-gray-300 object-cover mx-auto"
          />
          <label
            htmlFor="fileInput"
            className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer shadow-lg hover:bg-blue-600 transition"
          >
            <FiCamera size={16} />
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Name Input */}
          <div>
            <label className="text-gray-700 font-medium block mb-1">Full Name</label>
            <div className="relative">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                required
              />
              <FiUser className="absolute inset-y-0 right-4 flex items-center text-gray-500" />
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label className="text-gray-700 font-medium block mb-1">Email</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                required
              />
              <FiMail className="absolute inset-y-0 right-4 flex items-center text-gray-500" />
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-3 rounded-lg hover:bg-blue-600 transition duration-300 shadow-md flex items-center justify-center"
          >
            <FiSave className="mr-2 text-lg" /> Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
