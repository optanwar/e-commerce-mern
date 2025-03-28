const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');

const router = express.Router();



router.route("/registerUser").post(registerUser);
router.route("/loginUser").post(loginUser);


module.exports = router;