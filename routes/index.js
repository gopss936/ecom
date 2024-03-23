const express = require('express');
const router = express.Router();
const storeRoutes = require('./storeRoute');
const categoryRoutes = require('./categoryRoute');
const productRoutes = require('./productRoute');

router.use('/stores', storeRoutes);
router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);

module.exports = router;