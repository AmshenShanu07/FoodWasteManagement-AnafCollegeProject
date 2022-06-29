const express = require('express');
const router = express.Router();
const productQuery = require('../utils/database/product.query')
const orderQuery = require('../utils/database/order.query')

router.get('/home',(req,res)=>{
    res.render('retailer/home');
})


router.post('/create',async(req,res)=>{
    // res.json(req.body)

    const {name,offer,price,measure,quantity,radio,restaurant} = req.body
    const newPrdt = {
        name,price,quantity,restaurant,
        feature:radio=='YES'?true:false,
        pricePerUnit:`\$${price}/${measure}`,
        retailer:req.session.user._id
    }

    await productQuery.addProduct(newPrdt)

    res.redirect('/retailer/home')
})

router.get('/order',async(req,res)=>{
    console.log(req.session.user._id)
    const myOrders = await orderQuery.getRetailerOrderList(req.session.user._id);
    res.render('customer/orderlisting',{orders:myOrders})
})


module.exports = router