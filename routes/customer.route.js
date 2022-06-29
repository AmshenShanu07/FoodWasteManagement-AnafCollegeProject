const express = require('express');
const router = express.Router();
const productQuery = require('../utils/database/product.query')
const orderQuery = require('../utils/database/order.query');

router.get('/home',async(req,res)=>{
    const products = await productQuery.getAllProduct()
    res.render('customer/home', {offers:products})
})

router.get('/product/:id',async(req,res)=>{
    const {id} = req.params;
    const product = await productQuery.getSingleProduct(id);
    res.render('customer/deal',product)


})

router.get('/order',async(req,res)=>{
    const myOrders = await orderQuery.getCustomerOrderList(req.session.user._id);
    console.log(myOrders)
    res.render('customer/orderlisting',{orders:myOrders})
})


router.post('/order',async(req,res)=>{
    const {prdt, qnty} = req.body;
    const product = await productQuery.getSingleProduct(prdt);

    const orderDetails = {
        productId:product._id,
        userId:req.session.user._id,
        retailerId:product.retailer._id,
        quantity:qnty,
        total:parseInt(qnty)*product.price
    }

    const newOrder = await orderQuery.createOrder(orderDetails)

    res.redirect('/customer/home')
})

module.exports = router