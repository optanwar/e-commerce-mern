import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

const SignUp = () => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Create Account</h2>

      <form>
        {/* Name */}
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 mb-3 border rounded"
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 border rounded"
        />

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Profile Image</label>
          <div className="flex items-center gap-4">
            {/* Image Preview */}
            <div className="w-16 h-16 flex items-center justify-center border rounded-full overflow-hidden bg-gray-100 shrink-0">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-center"
                />
              ) : (
                <FaUserCircle className="text-6xl text-gray-400" />
              )}
            </div>

            {/* File Input */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
