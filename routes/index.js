const express = require('express');
const router = express.Router();
const userQuery = require('../utils/database/user.query')
// var users = require('../users.json');
// var _ = require('lodash');
//var bodyParser = require('body-parser');



router.get('/',(req,res)=>{
    res.redirect('/login')
})

router.get('/login',(req,res)=>{
    res.render('index');
})

router.get('/register',(req,res)=>{
    res.render('register')
})

router.post('/login',async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await userQuery.getUserByEmail(email);
        if(!user) res.send('no user')
        
        if(user.password === password){
            req.session.user = user;
            if(user.type =='customer'){
                res.redirect('/customer/home')
            }else if(user.type == 'retailer'){
                res.redirect('/retailer/home')
            }
        }else{
            res.send('wrong password')
        }

    }catch(err){
        res.send(err)
    }
})



router.post('/register',async(req,res)=>{
    try{
        const {radio,address,firstName,lastName,username,email,password,confirmPassword,checkbox} = req.body;
        if(password !== confirmPassword) res.send('password error');
            const user = await userQuery.createUser({
                firstName,
                lastName,
                password,
                email,
                username,
                address,
                type:radio==='Customer'?'customer':'retailer'
            })
            res.json(user)
        }catch(err){
            res.json(err)
        }
})





module.exports = router



