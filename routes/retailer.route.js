const express = require('express');
const router = express.Router();
const {validateRetailer} = require('../utils/middlewares/global.middlewares')

const {
    getHome,
    createProduct,
    getMyOrders,
    getAddProduct
} = require('../utils/controllers/retailer.controller');

router.get('/home',validateRetailer,getHome);
router.get('/add',validateRetailer,getAddProduct);
router.post('/create',validateRetailer,createProduct);
router.get('/order',validateRetailer,getMyOrders);


module.exports = router 