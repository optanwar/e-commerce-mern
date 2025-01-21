const catchAsyncErrors = require("./catchAsyncErrors");


const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    if (!req.user) {
        return next(new ErrorHandler("Login first to access this resource.", 401));
    }
    next();
}
);