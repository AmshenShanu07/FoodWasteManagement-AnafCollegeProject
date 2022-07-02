const { model } = require('mongoose');
const user = require('../schemas/user.schema')

module.exports.createUser = async(data)=>{

    const newUser =await new user(data);
    return await newUser.save()
}

module.exports.getAllUsers = async()=>{
    return await user.find({type:{$ne:'admin'}}) 
}

module.exports.delete = async(id)=>{
    return await user.findByIdAndDelete(id);
}

module.exports.getUserByEmail = async(email)=>{
    return await user.findOne({email})
}

module.exports.getUserById = async(id)=>{
    return await user.findById(id);
}