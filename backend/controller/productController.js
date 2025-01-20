const Product = require("../module/productModule")




// Create Products --Admin
exports.createProduct =async ( req, res, next ) =>{
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        message: "Product created successfully",
        product
    })
}


// Get all Products

exports.getAllProducts = async (req, res, next)=>{
    const products = await Product.find();

    res.status(200).json({
        success: true,
        message: "Products retrieved successfully",
        products
    })
}