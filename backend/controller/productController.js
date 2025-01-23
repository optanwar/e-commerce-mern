const Product = require("../module/productModule");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");


// Create Products --Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    product,
  });
});

// Get all Products

exports.getAllProducts =catchAsyncErrors( async (req, res, next) => {
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
  const products = await apiFeature.query;

  res.status(200).json({
    success: true,
    message: "Products retrieved successfully",
    products,
    productsCount
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
 
// Create New Review or update the review => /api/v1/review

exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
  };
  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
  );



  if (isReviewed) {
      product.reviews.forEach((review) => {
          if (review.user.toString() === req.user._id.toString()) {
              review.comment = comment;
              review.rating = rating;
          }
      });
  } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
  }
  product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

  await product.save({ validateBeforeSave: false });
  res.status(200).json({
      success: true,
      message: "Review created successfully",
  });
  });


  // Get all Review 
  exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
});

// Delete review 

exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // Filter out the review that matches the id in the query
  const reviews = product.reviews.filter((review) => review._id.toString() !== req.query.id.toString());

  // If the length of reviews is the same as before, it means the review was not found
  if (reviews.length === product.reviews.length) {
    return next(new ErrorHandler("Review not found", 404));
  }

  const numOfReviews = reviews.length;

  // Calculate the new average rating based on the updated reviews list
  const ratings = reviews.reduce((acc, item) => item.rating + acc, 0) / numOfReviews;

  // Update the product details
  product.reviews = reviews;
  product.numOfReviews = numOfReviews;
  product.ratings = ratings;

  // Save the updated product
  await product.save({ validateBeforeSave: false });

  // Send a success response
  res.status(200).json({
    success: true,
    message: "Review deleted successfully",
  });
});




 