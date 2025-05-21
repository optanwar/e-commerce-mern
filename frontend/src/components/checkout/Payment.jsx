import React, { useState } from 'react';
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';

const CARD_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: 'Arial, sans-serif',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
    },
  },
};

const Payment = ({ onComplete }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const { totalAmount } = useSelector((state) => state.cart);
   const { token } = useSelector((state) => state.auth);
  console.log(token,55)

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    try {
      const response = await fetch('http://localhost:4000/api/v1/payment/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: Math.round(totalAmount * 100) }), // Convert to cents
      });

      const { client_secret } = await response.json();

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (result.error) {
        setError(result.error.message);
        setProcessing(false);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          setProcessing(false);
          onComplete(); // Notify parent
        }
      }
    } catch (err) {
      setError('Payment failed');
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 shadow rounded bg-white">
  <h2 className="text-xl font-semibold mb-2">💳 Secure Payment</h2>

  {/* Display total amount */}
 
  <form onSubmit={handlePayment}>
    <div className="mb-4 border p-2 rounded">
      <CardElement options={CARD_OPTIONS} />
    </div>

    {error && <p className="text-red-500 mb-2">{error}</p>}

    <button
      type="submit"
      disabled={!stripe || processing}
      className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
    >
      {processing ? 'Processing...' : `Pay $${totalAmount.toFixed(2)}`}
    </button>
  </form>
</div>

  );
};

export default Payment;
