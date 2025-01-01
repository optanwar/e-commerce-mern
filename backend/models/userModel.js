const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please enter your name"],
        trim:true,
        maxLength:[30, "Your name cannot exceed 30 characters"],
        minLength:[4, "Your name should have more than 5 character"]
    
    },
    email:
    {
        type:String,
        required:[true, "Please enter your email"],
        unique:true,
        validate:[validator.isEmail,"Please enter a valid email"],
        trim:true,
    },
    password:{
        type:String,
        required:[true, "Please enter your password"],
        minLength:[8, "Your password should have more than 8 character"],
        select:false,
    },
    avatar:{
        public_id:{
            type:String,
            required:false,
        },
        url:{
            type:String,
            required:false,
        }
    },
    role:{
        type:String,
        default:"user",
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
    
});

// Encrypting password before saving user

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});


// jwt token
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_TIME,
    });
};

module.exports = mongoose.model('User', userSchema);