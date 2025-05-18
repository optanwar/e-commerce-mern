const express = require('express');

const router = express.Router();

const {isAuthenticatedUser} = require('../middleware/auth');
const { processPayment } = require('../controllers/paymentController');

router.route('/payment/process').post(isAuthenticatedUser, processPayment);

module.exports = router;