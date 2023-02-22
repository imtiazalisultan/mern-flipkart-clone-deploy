import mongoose from "mongoose";

import dotenv from 'dotenv';

dotenv.config({path:'./config.env'});

const Connection = async(URL) =>{
  
    try{
      
        await mongoose.connect(URL,{useUnifiedTopology:true, useNewUrlParser:true});
        console.log(`MongoDB connection is successfull :)`)
         
    }catch(err){
        console.log(`MongoDB connection error:(`,err.message)
    }
}
export default Connection;


//  mongoose.connect(db,{useUnifiedTopology:true, useNewUrlParser:true})
//  .then(()=>console.log(`MongoDB connection is successfull :)`))
//  .catch((err)=>console.log(`MongoDB connection error:(`,err.message))
        