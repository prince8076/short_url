const shortid = require('shortid')
const URL = require('../modles/url');
async function handleGenerateNewShortUrl (req,res){
    const body= req.body;
    if(!body.url) return res.status(400).json({error:'url is required'})
    const shortId = shortid(); //how much char you need nanoid(no of char)
    await URL.create({
        shortId:shortId,
        redirectURL:body.url,
        visitHistory:[],
        createdBy:req.user._id,
    });
    return res.render('home',{
      id:shortId
    });
    // return res.json({id:shortId})  for getting the id
}
async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });
  }
  

module.exports={
    handleGenerateNewShortUrl,
    handleGetAnalytics,
}