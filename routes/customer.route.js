const { application } = require('express');
const express = require('express');
const router = express.Router();

router.get('/home',(req,res)=>{
    res.render('customer/home', {offers:[]})
})


module.exports = router