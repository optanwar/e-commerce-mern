const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');


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

    sendToken(user,201, res);
}
);


// Login user => /api/v1/login

exports.loginUser = catchAsyncErrors(async (req, res , next) => {
    const { email, password } = req.body;
    // Check if email and password are entered by user
    if (!email || !password) {  
        return next(new ErrorHandler('Please enter email and password', 400));
    }
    // Finding user in database
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }
    // Check if password is correct
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }
    // If everything is correct, send token to user
    

    sendToken(user,200, res);
}
);



