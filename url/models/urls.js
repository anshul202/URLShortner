const mongoose=require('mongoose');

const urlSchema=new mongoose.Schema({
    shortid:{
        type:String,
        required:true,
        unique:true,
    },
    redirectUrl:{
        type:String,
        required:true,
    },
    visitHistory:[{timeStamp:{type:Number}}]},
    {timeStamps:true}
);

const URL=mongoose.model('URL',urlSchema);

module.exports=URL;