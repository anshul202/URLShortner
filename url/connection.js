const mongoose=require('mongoose');

const connectDb=async(url)=>{
    try{
        const res=await mongoose.connect(url);
        if(res){
            console.log("Connected to the database");
        }
    }catch(err){
        console.log(err);
    }
}

module.exports=connectDb;