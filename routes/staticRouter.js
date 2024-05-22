const express = require('express');
const router = express.Router();
const URL =require('../modles/url');
const { restrictTo } = require('../middleware/auth');



router.get('/', restrictTo(['NORMAL']),async(req,res)=>{
    // if(!req.user) return res.redirect('/login');
    const allUrls = await URL.find({createdBy:req.user._id}); // we are find createdBy id
    return res.render("home",{
        urls:allUrls // we can access url using locals.name here we have url
    })
})
router.get('/signup',(req,res)=>{
    return res.render('signup');
})
router.get('/login',(req,res)=>{
    return res.render('login');
})

module.exports= router;