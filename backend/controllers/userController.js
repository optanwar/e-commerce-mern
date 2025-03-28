const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../models/userModel');


// Register a user => /api/v1/register

exports.registerUser = catchAsyncErrors(async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: 'public_id',
            url: 'url'
        }
    });

    const token = user.getJWTToken();
    res.status(201).json({
        success: true,
        token,
        user,
    });
}
);

