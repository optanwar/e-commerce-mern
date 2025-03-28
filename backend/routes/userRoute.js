const express = require('express');
const { registerUser, loginUser, logout, forgotPassword } = require('../controllers/userController');

const router = express.Router();



router.route("/registerUser").post(registerUser);
router.route("/loginUser").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").post(forgotPassword);
router.route("/logout").get(logout);


module.exports = router;