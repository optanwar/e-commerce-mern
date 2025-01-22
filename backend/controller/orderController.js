const Product = require("../module/productModule");
const Order = require("../module/orderModel")
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");


// create new order

exports.newOrder = catchAsyncErrors(async (req, res, next) => {

    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
    })

    res.status(200).json({
        success: true,
        order
    })
})



// Get single order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if (!order) {
        return next(new ErrorHandler('No Order found with this ID', 404))
    }

    res.status(200).json({
        success: true,
        order
    })
});


// Get logged in user orders

exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id })

    res.status(200).json({
        success: true,
        orders
    })
} );


// Get all orders - ADMIN
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find()

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
});


// Update / Process orders - ADMIN

exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)


    
    if (!order) {
        return next(new ErrorHandler('No Order found with this ID', 404))
    }



    if (order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('You have already delivered this order', 400))
    }

    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity)
    })

    order.orderStatus = req.body.status;

    if (req.body.status === 'Delivered') {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true,
        message: 'Order updated successfully'
    })
} );


async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.stock = product.stock - quantity;

    await product.save({ validateBeforeSave: false })
}


// Delete Order - ADMIN
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (!order) {
        return next(new ErrorHandler('No Order found with this ID', 404))
    }

    await order.remove();

    res.status(200).json({
        success: true
    })
} );