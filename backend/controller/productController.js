const Product = require("../module/productModule");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");


// Create Products --Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    product,
  });
});

// Get all Products

exports.getAllProducts =catchAsyncErrors( async (req, res, next) => {

  const apiFeature = new ApiFeatures
  const products = await Product.find();

  res.status(200).json({
    success: true,
    message: "Products retrieved successfully",
    products,
  });
});

// Get Products details
exports.getProductDetails =catchAsyncErrors( async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Product details retrieved successfully",
    product,
  });
});

// Update product --Admin

exports.updateProduct =catchAsyncErrors( async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    product,
  });
});

// Delete Products

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  await product.deleteOne();
  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});
