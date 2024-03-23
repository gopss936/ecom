const express = require('express');
const router = express.Router();
const productController = require('../services/productService');

router.get('/', productController.getAllProducts);
router.get('/categories/:categoryId/products', productController.getProductsByCategory);
router.post('/create', productController.createProduct);
router.post('/place-order', productController.placeOrder);
router.get('/getAllOrders', productController.getAllOrders);
router.get('/orderById', productController.getOrderById);

module.exports = router;