const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncError');
const sendToken = require('../utils/jwtToken');




const User = require('../models/userModel')



// Register a user => /api/v1/register

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const {name, email, password} = req.body;
    const user = await User.create({name, email, password, avatar:{
        public_id:'public_id',
        url:'url'
    }})

    sendToken(user, 201, res)
});


// Login user => /api/v1/login

exports.loginUser = catchAsyncErrors(async (req, res, next) => { 
    const {email, password} = req.body;

    // Check if email and password is entered by user
    if (!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400));
    }

const user = await User.findOne({email}).select('+password');

if (!user) {
    return next(new ErrorHandler('Invalid Email or Password', 401));    }
    const isPasswordMatched = await user.comparePassword(password);


    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

   sendToken(user, 200, res)


});