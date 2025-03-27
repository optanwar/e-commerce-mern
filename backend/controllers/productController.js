const Product = require('../models/productModel');

// Create new product => Admin

exports.createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);


  res.status(201).json({
    status: 'success',
    message: 'Products is created!',
    product
  });

};

// Get all products 
exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    status: 'success',
    message: 'Products get successfully!',
    products
  });

}