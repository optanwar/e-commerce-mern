const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

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


// Logout user => /api/v1/logout

exports.logout = catchAsyncErrors(async (req, res ,next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    });
});



// Forgot Password => /api/v1/password/forgot

exports.forgotPassword = catchAsyncErrors(async (req, res ,next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHandler('User not found', 404));
    }
    // Get reset password token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    // Create reset password url

    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is as follow:\n\n ${resetPasswordUrl} \n\nIf you have not requested this email, then ignore it. `;

    try {
        await sendEmail({
            email: user.email,
            subject: `Ecommerce password recovery`,
            message
        });
        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(`Error sending email ${error.message}`, 500));


    }
}

);


// Reset Password => /api/v1/password/reset/:token
    

    exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
        // Hash URL token
        const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordTokenExpires: { $gt: Date.now() },
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
        user.resetPasswordTokenExpires = undefined;
    
        await user.save();
    
        sendToken(user, 200, res);
        });
    


// Get User Details => /api/v1/me

exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
 
    res.status(200).json({
        success: true,
        user
    });
    });


// Update User Password => /api/v1/password/update

exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');
    // Check previous user password
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if (!isPasswordMatched) {
        return next(new ErrorHandler('Old password is incorrect', 400));
        }

    // If password matched then update password

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not match', 400));
    }

    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200, res);
    }
);


// Update User Profile => /api/v1/me/update

exports.updateProfile = catchAsyncErrors(async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email
    };

    // We will add cloudinary later
    if (req.body.avatar !== '') {
        newUserData.avatar = {
            public_id: 'public_id',
            url: 'url'
        };
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        user
    });
}
);


// Admin Routes

// Get all users => /api/v1/admin/users
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users,
    });
}
);


// Get single user details (admin)=> /api/v1/admin/user/:id

exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`, 400));
    }
    res.status(200).json({
        success: true,
        user
    });
}
);


// Update User Role => /api/v1/admin/user/:id

exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    };
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
        });

        if (!user) {
            return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`, 400));
        }

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            user
            });

        
            }
);

// Delete User => /api/v1/admin/user/:id

exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`, 400));
    }
    await user.deleteOne();
    // We will remove cloudinary later
    res.status(200).json({
        success: true,
        message: 'User deleted successfully'
    });
}
);





