const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';



    // Wrong Mongoose Object ID Error
    if (err.name === 'CastError') {
        const message = 'Resource not found. Please check the ID. Invalid: ' + err.path;
        err = new ErrorHandler(message, 400);
    }




    res.status(err.statusCode).json({
        success: false,      
        error: err.stack,
        message: err.message
    });

}