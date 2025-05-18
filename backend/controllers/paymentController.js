const catchAyncError = require("../middleware/catchAsyncErrors");

const stripe = require("stripe")(process.env.SRIPE_API_SECRET);


// Process Stripe Payments
exports.processPayment = catchAyncError(async (req, res) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "usd",
        metadata: { integration_check: "accept_a_payment",  },
    });
    
    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret,
    });
    }
    );