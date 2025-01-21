const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../module/userModel");



// Register a user => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password, role } = req.body;
    
    const user = await User.create({
        name,
        email,
        password,
        role,
        avatar: {
            public_id: "public_id",
            url: "url",
        },
    });
    
    const token = user.getJWTToken();
    
    res.status(201).json({
        success: true,
        message: "User Registered successfully",
        token,
        user,
    });
    });


//   login a user => /api/v1/login

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    // Check if email and password is entered by user
    if (!email || !password) {
        return next(new ErrorHandler("Please enter email & password", 400));
    }

    // Finding user in database
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }
    // Check if password is correct
    const isPasswordMatched = await user.comparePassword(password);
    
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }
    const token = user.getJWTToken();
    
    res.status(201).json({
        success: true,
        message: "User Registered successfully",
        token,
        user,
    });
    });
