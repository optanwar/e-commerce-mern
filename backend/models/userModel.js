const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: [true, 'Please enter your name'],
        trim: true,
        maxLength: [30, 'Name cannot be more than 30 characters'],
        minLength: [4, 'Name cannot be less than 4 characters']
        },
        email: {
            type: String,
            required: [true, 'Please enter your email'],
            unique: true,
            trim: true,
            validate: [validator.isEmail, 'Please enter valid email address']
        },
        password: {
            type: String,
            required: [true, 'Please enter your password'],
            minLength: [6, 'Password cannot be less than 6 characters'],
            select: false
        },
        avatar: {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        },
        role: {
            type: String,
            default: 'user'
            },
            resetPasswordToken: String,
            resetPasswordTokenExpires: Date
            });

            // Encrypting password before saving user
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
        }
        this.password = await bcrypt.hash(this.password, 10);
        
        });


// Return JWT token
userSchema.methods.getJWTToken = function () {
    return jwt.sign(
        { id: this._id },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    );
};

// Compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}



            module.exports = mongoose.model('User', userSchema);



