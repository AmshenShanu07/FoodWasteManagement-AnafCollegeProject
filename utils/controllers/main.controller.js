const userQuery = require('../database/user.query');

module.exports.getInitialPage = (req,res)=>{
    res.redirect('/login')
}

module.exports.getLoginPage = (req,res)=>{
    res.render('index');
}

module.exports.getRegisterPage = (req,res)=>{
    res.render('register')
}

module.exports.loginUser = async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await userQuery.getUserByEmail(email);
        if(!user) res.redirect('/register');
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
}

module.exports.createUser = async(req,res)=>{
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
            req.session.user = user;
            res.redirect('/customer/home')
        }catch(err){
            res.json(err)
        }
}


module.exports.logOut = (req,res)=>{
    req.session.user = undefined;
    res.redirect('/login')
}