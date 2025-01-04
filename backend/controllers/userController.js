const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncError');
const sendToken = require('../utils/jwtToken');

const sendEmail = require('../utils/sendEmail');


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


// Logout user => /api/v1/logout

exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    })
    // res.status(200).cookie('token', null, {
    //     expires: new Date(Date.now()),
    //     httpOnly: true
    // })
});



// Forgot Password => /api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({email:req.body.email});
    if (!user) {
        return next(new ErrorHandler('User not found with this email', 404));
    }
    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave:false});

    // Create reset password url
    
    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;
    
    const message = `Your password reset token is as follow:\n\n${resetPasswordUrl}\n\nIf you have not requested this email, then ignore it.`;
 

    try {
        await sendEmail({
            email:user.email,
            subject:'ShopIT Password Recovery',
            message
        });
        res.status(200).json({
            success:true,
            message:`Email sent to: ${user.email}`
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(error.message, 500))
    }


});                                     