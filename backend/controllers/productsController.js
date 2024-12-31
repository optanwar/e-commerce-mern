const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncError');


const ApiFeature = require('../utils/apiFeatures');

// Create a new product ---Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
   
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    });
});

// Get all products
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
    const resultPerPage = 20;
    const productsCount = await Product.countDocuments();
const apiFeature = new ApiFeature(Product.find(), req.query)
.search()
.filter().pagination(resultPerPage);

const products = await apiFeature.query;
    res.status(200).json({
        success: true,
        products
    });
});

// Get product details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    res.status(200).json({
        success: true,
        product,
        productsCount
    });
});

// Delete all products ---Admin
exports.deleteAllProducts = catchAsyncErrors(async (req, res, next) => {
    await Product.deleteMany();
    res.status(200).json({
        success: true,
        message: 'All products have been deleted successfully'
    });
});

// Update product ---Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        product
    });
});

// Delete product ---Admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    await product.deleteOne();

    res.status(200).json({
        success: true,
        message: 'Product has been deleted successfully'
    });
});
