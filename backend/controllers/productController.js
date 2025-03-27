const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');

// Create new product => Admin

exports.createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);


  res.status(201).json({
    success: true,
    message: 'Products is created!',
    product
  });

};

// Get all products 
exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    message: 'Products get successfully!',
    products
  });

}


// Get single product details

exports.getProductDetails = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    message: 'Product details get successfully!',
    product
  });
}




// Update product => Admin

exports.updateProduct = async ( req, res , next ) => {
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
}

// Delete product => Admin

exports.deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  await product.deleteOne();
  res.status(200).json({
    success: true,
    message: 'Product is deleted successfully!'
  });
}   