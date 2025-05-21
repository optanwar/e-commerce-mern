import React, { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const ShippingDetails = lazy(() => import('./ShippingDetails'));
const ConfirmOrder = lazy(() => import('./ConfirmOrder'));
const Payment = lazy(() => import('./Payment'));

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
  // const handleReset = () => {
  //   setActiveStep(0);
  //   setFormData({
  //     fullName: '',
  //     email: '',
  //     address: '',
  //     city: '',
  //     postalCode: '',
  //   });
  //   setErrors({});
  // };

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

      {/* Step Content with Animation */}
      <div className="bg-white rounded-lg shadow p-6 min-h-[200px]">
        <Suspense fallback={<div>Loading...</div>}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {activeStep === 0 && (
                <ShippingDetails formData={formData} errors={errors} handleChange={handleChange} />
              )}
              {activeStep === 1 && <ConfirmOrder formData={formData} />}
              {activeStep === 2 && <Payment onComplete={handleNext} />}
              {activeStep === steps.length && (
                <div className="text-center">
                  <h2 className="text-lg font-semibold mb-2">🎉 Order Completed!</h2>
                  <p className="mb-4">Thank you for your purchase.</p>
                  <Link to="/my-orders"
                    
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    My Orders
                  </Link>
                  {/* <button
                    onClick={handleReset}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    My Orders
                  </button> */}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </Suspense>
      </div>

      {/* Navigation */}
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
