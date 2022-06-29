const express = require('express');
const router = express.Router();
const {
    getInitialPage,
    getLoginPage,
    getRegisterPage,
    loginUser,
    createUser
} = require('../utils/controllers/main.controller')



router.get('/',getInitialPage);
router.get('/login',getLoginPage);
router.get('/register',getRegisterPage);
router.post('/login',loginUser);



router.post('/register',createUser)





module.exports = router