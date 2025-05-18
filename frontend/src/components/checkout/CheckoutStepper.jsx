import React, { useState } from 'react';

const steps = ['Shipping Details', 'Confirm Order', 'Payment'];

const CheckoutStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
  });
  const [errors, setErrors] = useState({});

  const validateStep = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^@]+@[^@]+\.[^@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.postalCode) newErrors.postalCode = 'Postal code is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (activeStep === 0 && !validateStep()) return;
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleReset = () => {
    setActiveStep(0);
    setFormData({
      fullName: '',
      email: '',
      address: '',
      city: '',
      postalCode: '',
    });
    setErrors({});
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: '',
    }));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Stepper */}
      <div className="flex justify-between mb-8">
        {steps.map((label, idx) => (
          <div key={label} className="flex-1 text-center">
            <div
              className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center text-white ${
                activeStep >= idx ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              {idx + 1}
            </div>
            <div className="mt-2 text-sm font-medium">{label}</div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow p-6">
        {activeStep === 0 && (
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Full Name</label>
              <input
                type="text"
                name="fullName"
                className="w-full border rounded p-2 mt-1"
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                className="w-full border rounded p-2 mt-1"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Address</label>
              <input
                type="text"
                name="address"
                className="w-full border rounded p-2 mt-1"
                value={formData.address}
                onChange={handleChange}
              />
              {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">City</label>
                <input
                  type="text"
                  name="city"
                  className="w-full border rounded p-2 mt-1"
                  value={formData.city}
                  onChange={handleChange}
                />
                {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium">Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  className="w-full border rounded p-2 mt-1"
                  value={formData.postalCode}
                  onChange={handleChange}
                />
                {errors.postalCode && <p className="text-red-500 text-sm">{errors.postalCode}</p>}
              </div>
            </div>
          </form>
        )}

        {activeStep === 1 && (
          <div className="space-y-2">
            <h2 className="text-lg font-semibold mb-4">Confirm Your Details</h2>
            <p><strong>Name:</strong> {formData.fullName}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Address:</strong> {formData.address}</p>
            <p><strong>City:</strong> {formData.city}</p>
            <p><strong>Postal Code:</strong> {formData.postalCode}</p>
          </div>
        )}

        {activeStep === 2 && (
          <div className="text-center">
            <h2 className="text-lg font-semibold mb-2">💳 Payment</h2>
            <p className="mb-4">Payment gateway integration goes here.</p>
            <button
              onClick={handleNext}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Complete Order
            </button>
          </div>
        )}

        {activeStep === steps.length && (
          <div className="text-center">
            <h2 className="text-lg font-semibold mb-2">🎉 Order Completed!</h2>
            <p className="mb-4">Thank you for your purchase.</p>
            <button
              onClick={handleReset}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Start Over
            </button>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      {activeStep < steps.length && (
        <div className="flex justify-between mt-6">
          <button
            onClick={handleBack}
            disabled={activeStep === 0}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {activeStep === steps.length - 1 ? 'Complete Order' : 'Next'}
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckoutStepper;
