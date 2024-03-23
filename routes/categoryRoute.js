const express = require('express');
const router = express.Router();
const categoryController = require('../services/categoryService');

router.get('/', categoryController.getAllCategory);
router.post('/create', categoryController.createCategory);
router.get('/products', categoryController.getCategoryWiseProducts);

module.exports = router;