import mongoose from "mongoose";

const userContactSchema = new mongoose.Schema({

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
            time:{
                type:Date,
                default: Date.now()
            }
        
});

userContactSchema.methods.addMessage = async function(name,email, phone, message){
    try{
        console.log("call in Schema");
        this.messages = await this.messages.concat({name,email, phone, message});
        await this.save();
        return this.messages;
        
    }catch(err){
        console.log(err);
    }
}

const UserContact = mongoose.model('userContactMessage',userContactSchema);

export default UserContact;