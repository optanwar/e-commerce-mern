const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");

const ApiFeature = require("../utils/apiFeatures");

// Create a new product ---Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// Get all products
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 5;


  const productsCount = await Product.countDocuments();
  const apiFeature = new ApiFeature(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  const products = await apiFeature.query;
  res.status(200).json({
    success: true,
    productsCount,
    resultPerPage,
    products,
  });
});

// Get product details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
 
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
   
  });
});

// Delete all products ---Admin
exports.deleteAllProducts = catchAsyncErrors(async (req, res, next) => {
  await Product.deleteMany();
  res.status(200).json({
    success: true,
    message: "All products have been deleted successfully",
  });
});

// Update product ---Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
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
    product,
  });
});

// Delete product ---Admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product has been deleted successfully",
  });
});

// Create new review or update review

exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user.id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user.id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user.id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// get all review of a product

exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req && req.query.id);
  if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
    const reviews = product.reviews;

  res.status(200).json({
    success: true,
    reviews,
  });
});

// Delete review

exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
    const reviews = product.reviews.filter(
      (review) => review._id.toString() !== req.query.id.toString()
    );
    const numOfReviews = reviews.length;
    product.reviews = reviews;
    product.numOfReviews = numOfReviews;
    product.ratings =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
    await product.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
      message: "Review has been deleted successfully",
    });
  });


