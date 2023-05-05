const shortid=require('shortid');
const Url=require('../models/url');
async function generateShortUrl(req, res) {
  const body=req.body;  
  /*console.log(req.body);*/
  if(!body.url){
    return res.status(400).json({error:'url is required'})
  }
  const shortId_generated=shortid();
  
  await Url.create({
    shortId:shortId_generated,
    redirectUrl:body.url, 
    clickHistory:[],
});
return res.render('home',{id:shortId_generated});
return res.status(201).json({shortId_generated});
}

async function getClickHistory(req,res){
    const shortId=req.params.shortId;
    const data=await Url.findOne({shortId:shortId});
    if(!data){
        return res.status(404).json({error:'url not found'});
    }
    else{
        return res.status(200).json({visited:data.clickHistory.length, clickHistory:data.clickHistory});
    }
  }

module.exports={
    generateShortUrl,
    getClickHistory
}