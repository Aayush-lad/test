const express=require('express');
const router = express.Router();
 const {generateShortUrl,getClickHistory,getpage }=require('../controllers/url');

router.post("/",generateShortUrl);
/*router.get("/analytics/:shortId",getClickHistory);*/
router.get("/analytic",getpage);
router.post("/analytic",getClickHistory);

module.exports=router;
