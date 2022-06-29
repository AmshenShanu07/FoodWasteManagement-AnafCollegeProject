const express = require('express');
const router = express.Router();
const {
    getHome,
    getSingleProduct,
    getOrderList,
    createOrder
} = require('../utils/controllers/customer.controller');
const {validateUser} = require('../utils/middlewares/global.middlewares')

router.get('/home',getHome);
router.get('/product/:id',getSingleProduct);
router.get('/order',validateUser,getOrderList);
router.post('/order',validateUser,createOrder);

module.exports = router