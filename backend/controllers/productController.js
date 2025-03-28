const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ApiFeatures = require('../utils/apiFeatures');

// Create new product => Admin

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);


  res.status(201).json({
    success: true,
    message: 'Products is created!',
    product
  });

});

// Get all products 
exports.getAllProducts =catchAsyncErrors( async (req, res) => {

  const resultPerPage = 5;
  const productCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures( Product.find(), req.query).search().filter().pagination(resultPerPage);
  const products = await apiFeature.query;  
  res.status(200).json({
    success: true,
    message: 'Products get successfully!',
    products,
    productCount
  });

});


// Get single product details

exports.getProductDetails =catchAsyncErrors( async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    message: 'Product details get successfully!',
    product
  });
});




// Update product => Admin

exports.updateProduct = catchAsyncErrors(async ( req, res , next ) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });

  res.status(200).json({
    success: true,
    message: 'Product updated successfully!',
    product
  });
});

// Delete product => Admin

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  await product.deleteOne();
  res.status(200).json({
    success: true,
    message: 'Product is deleted successfully!'
  });
}  ) 