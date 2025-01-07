const express = require('express');
const router = express.Router();

// Import the required controller and middleware
const { newOrder, getSingleOrder, myOrders } = require('../controllers/orderController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

// Define the route for creating a new order
router.route('/order/new').post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, authorizeRoles("admin"), getSingleOrder);

router.route('/order/me').get(isAuthenticatedUser, myOrders);


module.exports = router;
