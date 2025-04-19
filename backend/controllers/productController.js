const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ApiFeatures = require('../utils/apiFeatures');

// Create new product => Admin

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id; // Add user id to the product data
  const product = await Product.create(req.body);


  res.status(201).json({
    success: true,
    message: 'Products is created!',
    product
  });

});

// Get all products 
exports.getAllProducts =catchAsyncErrors( async (req, res) => {

  const resultPerPage = 8;
  const productCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures( Product.find(), req.query).search().filter().pagination(resultPerPage);
  const products = await apiFeature.query;  
  const prices = await Product.find().select('price');
  const allPrices = prices.map(p => p.price);
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);
  res.status(200).json({
    success: true,
    message: 'Products get successfully!',
    products,
    productCount,
    resultPerPage,
    minPrice,
    maxPrice,
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

// Create new review or update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment
  };
  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  ); 

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        (rev.rating = rating), (rev.comment = comment);
      }
    }
    );
  }
  else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    message: 'Review submitted successfully!'
  });
}
);


// Get all reviews of a product

exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id).populate('reviews');
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews
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






