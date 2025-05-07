import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../../slices/authSlice'; // Adjust the path to where your slice is located

const SignUp = () => {
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    avatar: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setFormData({ ...formData, avatar: file }); // Corrected from 'image' to 'avatar'
    } else {
      setImagePreview(null);
      setFormData({ ...formData, avatar: null }); // Corrected from 'image' to 'avatar'
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const validationErrors = {};
    if (!formData.name.trim()) validationErrors.name = 'Name is required';
    if (!formData.email.trim()) validationErrors.email = 'Email is required';
    if (!formData.password.trim()) validationErrors.password = 'Password is required';
    if (formData.password.length < 6) validationErrors.password = 'Password must be at least 6 characters';
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Dispatch the signup action
    const userData = new FormData();
    userData.append('name', formData.name);
    userData.append('email', formData.email);
    userData.append('password', formData.password);
    if (formData.avatar) userData.append('avatar', formData.avatar); // Corrected from 'image' to 'avatar'
          
    dispatch(signupUser(userData));
  };

  return (
    <div className="max-w-sm mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Create Account</h2>

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 mb-1 border rounded"
        />
        {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name}</p>}

        {/* Email */}
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-1 border rounded"
        />
        {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}

        {/* Password */}
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 mb-1 border rounded"
        />
        {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password}</p>}

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
                  className="w-full h-full object-cover"
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

        {/* Error Display */}
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
