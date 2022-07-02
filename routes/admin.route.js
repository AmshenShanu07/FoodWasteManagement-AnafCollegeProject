const express = require('express');
const router = express.Router();
const userQuery = require('../utils/database/user.query');
const { validateAdmin } = require('../utils/middlewares/global.middlewares');

router.get('/',validateAdmin,async(req,res)=>{
    const users = await userQuery.getAllUsers();
    res.render('admin',{users})
})



router.get('/:id',validateAdmin,async (req,res)=>{
    try{
        const id = req.params.id;
        await userQuery.delete(id)
        res.json({status:true})
    }catch(err){
        console.log(err)
        res.json(err)
    }
})

module.exports = router;