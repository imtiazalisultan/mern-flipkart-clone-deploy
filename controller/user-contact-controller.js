import  UserContact  from "../model/userContactSchema.js";

export const contactUser = async(req,res) =>{
    try{

        const {name, email, phone, message} = req.body 

            const newUserContact = new UserContact({name, email, phone, message});
           
            await newUserContact.save();
           
            res.status(201).json({message:"Mesaage Successfully Send"});

        


    }catch(err){
            console.log(err);
    }
    
}