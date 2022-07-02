const productQuery = require('../database/product.query');
const orderQuery = require('../database/order.query');
const fs = require('fs');

module.exports.getHome = async(req,res)=>{
    const products = await productQuery.getMyProducts(req.session.user._id);
    res.render('retailer/home', {offers:products})
}

module.exports.getAddProduct = (req,res)=>{
    res.render('retailer/add');
}

module.exports.createProduct = async(req,res)=>{
    var base64Data = req.body.image.replace(/^data:image\/png;base64,/, "");
    const imgSplit = req.body.localImg.split('.')
    const ext = imgSplit[imgSplit.length - 1]
    const imgName = `${Date.now()}.${ext}`
    fs.writeFile(`./public/products/${imgName}`, base64Data, 'base64',()=>{});

    const {name,offer,price,measure,quantity,radio,restaurant} = req.body
    const newPrdt = {
        name,price,quantity,restaurant,
        image:imgName,
        feature:radio=='YES'?true:false,
        pricePerUnit:`\₹${price}/${measure}`,
        retailer:req.session.user._id
    }

    await productQuery.addProduct(newPrdt)

    res.redirect('/retailer/home')
}

module.exports.getMyOrders = async(req,res)=>{
    const myOrders = await orderQuery.getRetailerOrderList(req.session.user._id);
    console.log(myOrders)
    res.render('customer/orderlisting',{orders:myOrders})
}