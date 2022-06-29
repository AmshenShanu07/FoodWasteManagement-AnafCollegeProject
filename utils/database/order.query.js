const { ObjectId } = require('mongodb');
const order = require('../schemas/order.schema')

module.exports.createOrder = async(data)=>{
    const newOrder = new order(data);
    return await newOrder.save()
}

module.exports.getRetailerOrderList = async(id)=>{
    return await order.find({retailer:ObjectId(id)})
}

module.exports.getCustomerOrderList = async(id)=>{
    return await order.find({userId:ObjectId(id)})
}