const product = require('../schemas/product.schema');

module.exports.addProduct = async (data)=>{
    const newProduct = new product(data)
    return await newProduct.save()
}

module.exports.getAllProduct = async()=>{
    return await product.find({});
}

module.exports.getSingleProduct = async(id)=>{
    return await product.findById(id).populate('retailer')
}