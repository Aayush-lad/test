const mongoose = require('mongoose');
const urlSchema = new mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true

    },  
    redirectUrl:{
        type:String,
        required:true
    },
    clickHistory:[{timestamp:{type:Date}}]
},{timestamps:true});

const Url = mongoose.model('url',urlSchema);
module.exports = Url;   //exporting the model



