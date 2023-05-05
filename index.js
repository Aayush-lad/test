const express = require("express");
const app = express();
const PORT =8001;
const path = require("path");
const Url=require('./models/url');
const urlRoutes=require('./routes/url');
const {connectMongoDB}=require('./connect');    
const staticRoute = require('./routes/staticRouter');
connectMongoDB("mongodb://127.0.0.1:27017/short-url").then(() => console.log("MONGODB CONNECTED"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));
app.use("/",staticRoute);
app.use("/url",urlRoutes);  

app.get("/url/:shortId",async (req,res)=>{
    const shortId=req.params.shortId;
    const data=await Url.findOneAndUpdate({shortId:shortId},{$push:{clickHistory:{timestamp:Date.now()}}});
    if(!data){
        return res.status(404).json({error:'url not found'});
    }   
    else{
        res.redirect(data.redirectUrl);
    }
 
});
app.listen(PORT,()=>console.log('server started at port 3000'));