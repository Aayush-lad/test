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
  
    const shortId=req.body.shortId.substring(35);

    const data=await Url.findOne({shortId:shortId});
    console.log(shortId);
    if(!data){
        return res.render('analytics');
    }
    else{
        return res.render('analytics',{visited:data.clickHistory.length, data:data});
    }
  }
  async function getpage(req,res){
   
        return res.render('analytics');
    
  }

module.exports={
    generateShortUrl,
    getClickHistory,
    getpage
}
