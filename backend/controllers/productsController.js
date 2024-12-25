const product = require('../models/productModel');



// Create a new product ---Admin

exports.createProduct = async (req, res, next) => {
    const products = await product.create(req.body);

    res.status(201).json({
        success: true,
        products
})
}




// Get all products
exports.getAllProducts = async (req, res) => {
    const products = await product.find();
    res.status(200).json({
       success: true,
        products 
    });
}

// Get product details
exports.getProductDetails = async (req, res) => {
    const products = await product.findById(req.params.id);
    if(!products){
        return res.status(500).json({success: false, message: 'Product not found'});
    }
    res.status(200).json({
        success: true,
        products
    });
}
//Delete all products
exports.deleteAllProducts = async (req, res) => {
    const products = await product.deleteMany();
    res.status(200).json({
       success: true,
        products
    });
}
// Update product ---Admin


exports.updateProduct = async (req, res, next) => {
let products = await product.findById(req.params.id);
    if(!products){
        return res.status(500).json({success: false, message: 'Product not found'});
    }

    products = await product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({success: true, products});
}



// Delete product ---Admin

exports.deleteProduct = async (req, res, next) => {

    const products = await product.findById(req.params.id);
    if(!products){
        return res.status(500).json({success: false, message: 'Product not found'});
    }
    await products.deleteOne();
    res.status(200).json({success: true, message: 'Product is deleted successfully'});
}