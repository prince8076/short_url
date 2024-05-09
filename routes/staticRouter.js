const express = require('express');
const router = express.Router();
const URL =require('../modles/url');



router.get('/', async(req,res)=>{
    const allUrls = await URL.find({})
    return res.render("home",{
        urls:allUrls // we can access url using locals.name here we have url
    })
})

module.exports= router;