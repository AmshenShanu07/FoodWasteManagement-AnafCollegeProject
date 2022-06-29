const { model } = require('mongoose');
const user = require('../schemas/user.schema')

module.exports.createUser = async(data)=>{

    const newUser =await new user(data);
    return await newUser.save()
}

module.exports.getUserByEmail = async(email)=>{
    return await user.findOne({email})
}

module.exports.getUserById = async(id)=>{
    return await user.findById(id);
}