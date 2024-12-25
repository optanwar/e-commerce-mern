const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, deleteAllProducts, getProductDetails } = require('../controllers/productsController');

const router = express.Router();


router.route("/products").get(getAllProducts);
router.route("/products").delete(deleteAllProducts);
router.route("/product/new").post(createProduct);
router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getProductDetails);


module.exports = router;