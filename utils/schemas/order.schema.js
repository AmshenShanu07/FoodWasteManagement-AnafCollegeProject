const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    productId:{
        type:mongoose.Types.ObjectId,
        ref:'products'
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'users'
    },
    retailerId:{
        type:mongoose.Types.ObjectId,
        ref:'users'
    },
    quantity:{
        type:Number,
        required:true,
        default:1
    },
    total:{
        type:Number,
        required:true
    },
});

module.exports = mongoose.model('orders',orderSchema);