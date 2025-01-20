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



// Update product --Admin

exports.updateProduct = async (req, res, next) =>{
    let product = await Product.findById(req.params.id);
   
    if(!product){
        return res.status(500).json({
            success: false,
            message: "Product not found"
        })
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body,  {
        new: true,
        runValidators: true
      });

    res.status(200).json({
        success: true, 
        message: "Product updated successfully",
        product})
}


// Delete Products 

exports.deleteProduct = async (req, res , next) => {
    let product = await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success: false,
            message: "Product not found"
        })
    }
await product.deleteOne();
res.status(200).json({
    success: true,
    message: "Product deleted successfully"
    })

}