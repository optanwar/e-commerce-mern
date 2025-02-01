const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../module/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");



// Register a user => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {



     const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
    });

    const { name, email, password, role } = req.body;
    
    const user = await User.create({
        name,
        email,
        password,
        role,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },
    });
    
    sendToken(user, 201, res);
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
    
    sendToken(user, 200, res);
    });


    // Logout user => /api/v1/logout

exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged out",
    });
    });



    // forgot password => /api/v1/password/forgot

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email : req.body.email });
    if (!user) {
        return next(new ErrorHandler("User not found with this email", 404));
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    // Create reset password url
    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is as follow:\n\n${resetPasswordUrl}\n\nIf you have not requested this email, then ignore it.`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'ShopIT Password Recovery',
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));
    }

    });


    // Reset password => /api/v1/password/reset/:token

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    // Hash URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(new ErrorHandler('Password reset token is invalid or has been expired', 400));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not match', 400));
    }

    // Setup new password
    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
    });


    // Get user information

exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        message: "User details",
        user,
    });
    
});


// Update / Change password => /api/v1/password/update
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    // Check previous user password
    const isMatched = await user.comparePassword(req.body.oldPassword);

    if (!isMatched) {
        return next(new ErrorHandler('Old password is incorrect', 400));
        }
  
        if (req.body.newPassword !== req.body.confirmPassword) {
            return next(new ErrorHandler('Password does not match', 400));
        }

        user.password = req.body.newPassword;
        await user.save();

        sendToken(user, 200, res);
        });


 // Update user profile => /api/v1/me/update

exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
        });
        res.status(200).json({
            success: true,
        });

});


// Get all user -- admin router => /api/v1/admin/users


exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users,
    });
    }
    );


    // Get single user details -- admin router => /api/v1/admin/user/:id

    
    exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
        const
        user = await User.findById(req.params.id);
        if (!user) {
            return next(new ErrorHandler(`User does not found with id: ${req.params.id}`, 404));
        }
        res.status(200).json({
            success: true,
            user,
        });
        }
        );


    // update user details role -- admin router => /api/

    exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
        const newUserData = {
            name: req.body.name,
            email: req.body.email,
            role: req.body.role,
        };
        const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
            new: true,
            runValidators: true,

            
      
            });
            if (!user) {
                return next(new ErrorHandler(`User does not found with id: ${req.params.id}`, 404));
            }
            res.status(200).json({
                success: true,
                message: 'User role updated successfully',
            });
            }             );



    // Delete user => /api/v1/admin/user/:id
   
    exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
        const user = await User.findById(req.params.id);
        if (!user) {
            return next(new ErrorHandler(`User does not found with id: ${req.params.id}`, 404));
        }
        await user.remove();
        res.status(200).json({
            success: true,
            message: 'User deleted successfully',
        });
        });

    

