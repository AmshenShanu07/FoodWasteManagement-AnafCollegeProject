module.exports.validateUser = (req,res,next)=>{
    if(req.session.user){
        next()
    }else{
        res.redirect('/login')
    }
}

module.exports.validateRetailer = (req,res,next)=>{
    if(req.session.user?.type === 'retailer'){
        next()
    }else res.redirect('/customer/home')
}