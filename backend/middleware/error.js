const ErrorHandler = require('../utils/errorHandler');


module.exports = (err,  req , res, next) => {
  let statusCode = err.statusCode || 500 ;

let message = err.message || "Internal Server Error";


    // Wrong Mongoose Object ID Error

    if(err.name === 'CastError'){
        err.message = 'Resource not found';
        err = new ErrorHandler(message , 400)
      
    }

    // mongoose duplicate key error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message,400)
    }

    // wrong jwt error
    if(err.name === 'JsonWebTokenError'){
        const message = 'Json Web Token is invalid. Try again!!!';
        err = new ErrorHandler(message,400)
    }

    // wrong jwt expired error
    if(err.name === 'TokenExpiredError'){
        const message = 'Json Web Token is expired. Try again!!!';
        err = new ErrorHandler(message,400)
    }




    res.status(statusCode).json({
        success:false,
        message :message,
    })
};