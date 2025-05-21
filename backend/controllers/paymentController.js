const stripe = require('stripe')(process.env.STRIPE_API_SECRET);
const catchAsyncError = require('../middleware/catchAsyncErrors');

exports.processPayment = catchAsyncError(async (req, res) => {
  const { amount } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'usd',
    metadata: { integration_check: 'accept_a_payment' },
  });

  res.status(200).json({
    success: true,
    client_secret: paymentIntent.client_secret,
  });
});

exports.sendStripeApiKey= catchAsyncError(async (req, res) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});
