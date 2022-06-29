const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    waitTime:{
        type:String,
        required:true
    },
    offer:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    pricePerUnit:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    feature:{
        type:Boolean,
        required:true
    },
    retailer:{
        type:mongoose.Types.ObjectId,
        ref:"users"
    },
});

module.exports = mongoose.model('products',productSchema);