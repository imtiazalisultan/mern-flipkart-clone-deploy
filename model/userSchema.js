import mongoose from "mongoose";
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        trim:true,
        min:5,
        max:20,
    },
    lastname:{
        type:String,
        required:true,
        trim:true,
        min:5,
        max:20,
    },
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        index:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,

    },

    orders: [
        {
                address: String ,
                payment: String,
                cart: [{
                id:{
                    type:String,
                },
                url:String,
                detailUrl:String,
                title:Object,
                price:Object,
                quantity:Number,
                description:String,
                discount:String,
                tagline:String,
                time : { 
                    type : Date,
                    default: Date.now(), 
                    
                },
                
                } ],

                
          
        }
    ],

    tokens : [
        {
            token:{
                type:String,
                required:true
            }
        }
    ],
    messages:[
        {
            name:{
                type:String,
                required:true
            },
            email:{
                type:String,
                required:true
            },
            phone:{
                type:Number,
                minlength : 10,
                required:true,
                },
            message:{
                type:String,
               
            },
        }
    ],

});

userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}
userSchema.methods.addOrders = async function(address,payment,cart){
    try{
        this.orders = await this.orders.concat({address,payment,cart});
        await this.save();
        return this.orders;
        
    }catch(err){
        console.log(err);
    }
}

userSchema.methods.addMessage = async function(name,email, phone, message){
    try{
        this.messages = await this.messages.concat({name,email, phone, message});
        await this.save();
        return this.messages;
        
    }catch(err){
        console.log(err);
    }
}

const User = mongoose.model('user',userSchema);

export default User;