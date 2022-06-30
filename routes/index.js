const express = require('express');
const router = express.Router();
const {validateNullUser} = require('../utils/middlewares/global.middlewares')
const {
    getInitialPage,
    getLoginPage,
    getRegisterPage,
    loginUser,
    createUser,
    logOut
} = require('../utils/controllers/main.controller')



router.get('/',validateNullUser,getInitialPage);
router.get('/login',validateNullUser,getLoginPage);
router.get('/register',validateNullUser,getRegisterPage);
router.post('/login',validateNullUser,loginUser);
router.get('/logout',logOut);
router.post('/register',validateNullUser,createUser);





module.exports = router