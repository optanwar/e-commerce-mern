const express = require('express');
const router = express.Router();

// Import the required controller and middleware
const { newOrder, getSingleOrder, myOrders, allOrders, updateOrder, deleteOrder } = require('../controllers/orderController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

// Define the route for creating a new order
router.route('/order/new').post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser,  getSingleOrder);

router.route('/orders/me').get(isAuthenticatedUser, myOrders);



router.route('/admin/orders').get(isAuthenticatedUser, authorizeRoles('admin'), allOrders);


router.route('/admin/order/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateOrder).delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder);


module.exports = router;
