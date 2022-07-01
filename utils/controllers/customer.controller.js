const productQuery = require('../database/product.query')
const orderQuery = require('../database/order.query');

module.exports.getHome = async(req,res)=>{
    const products = await productQuery.getAllProduct()
    res.render('customer/home', {offers:products})
}

module.exports.getSingleProduct = async(req,res)=>{
    const {id} = req.params;
    const product = await productQuery.getSingleProduct(id);
    res.render('customer/deal',product)


}

module.exports.getOrderList = async(req,res)=>{
    const myOrders = await orderQuery.getCustomerOrderList(req.session.user._id);
    res.render('customer/orderlisting',{orders:myOrders})
}

module.exports.createOrder = async(req,res)=>{
    const {prdt, qnty} = req.body;
    const product = await productQuery.getSingleProduct(prdt);

    const orderDetails = {
        productId:product._id,
        userId:req.session.user._id,
        retailerId:product.retailer._id,
        quantity:qnty,
        total:parseInt(qnty)*product.price
    }

    await orderQuery.createOrder(orderDetails)

    res.redirect('/customer/order')
}