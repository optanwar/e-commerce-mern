const ErrorHandler = require('../utils/errorHandler');


module.exports = (err,  req , res, next) => {
  let statusCode = err.statusCode || 500 ;

let message = err.message || "Internal Server Error";


    // Wrong Mongoose Object ID Error

    if(err.name === 'CastError'){
        err.message = 'Resource not found';
        err = new ErrorHandler(message , 400)
      
    }


    res.status(statusCode).json({
        success:false,
        message :message,
    })
};