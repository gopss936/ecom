const express = require('express');
const router = express.Router();
const storeController = require('../services/storeService');

router.get('/', storeController.getAllStore);
router.post('/create', storeController.createStore);

module.exports = router;