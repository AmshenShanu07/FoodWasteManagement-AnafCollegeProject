const express = require('express');
const router = express.Router()

router.get('/',(req,res)=>{
    res.send('Project Started')
})



module.exports = router