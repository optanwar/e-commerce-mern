// backend/controllers/paymentController.js

const catchAsyncError = require("../middleware/catchAsyncErrors");
const stripe = require("stripe")(process.env.STRIPE_API_SECRET);

exports.processPayment = catchAsyncError(async (req, res) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "usd",
        metadata: { integration_check: "accept_a_payment" },
    });

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret,
    });
});

exports.sendStripeApiKey = catchAsyncError(async (req, res) => {
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY,
    });
});
