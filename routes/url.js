const express=require('express');
const router = express.Router();
 const {generateShortUrl,getClickHistory }=require('../controllers/url');

router.post("/",generateShortUrl);
router.get("/analytics/:shortId",getClickHistory);
module.exports=router;
