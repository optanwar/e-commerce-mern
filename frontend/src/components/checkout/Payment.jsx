import React from 'react';

const Payment = ({ onComplete }) => (
  <div className="text-center">
    <h2 className="text-lg font-semibold mb-2">💳 Payment</h2>
    <p className="mb-4">Payment gateway integration goes here.</p>
    <button
      onClick={onComplete}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Complete Order
    </button>
  </div>
);

export default Payment;
