
import User from "../model/userSchema.js";


export const userSignup = async(req,res)=>{
    try{

       const existUser = await User.findOne({username:req.body.username});
        if(existUser){
            return res.status(401).json({message:"username already exist"});
        }

        const user = req.body;
        const newUser = new User(user);
        await newUser.save();
        res.status(201).json({message: "User Registered Successfully"});
    }catch(err){
        res.status(500).json({message:err.message});
    }
}

export const userLogin = async(req,res)=>{

    
    const {username, password} = req.body;

    if(!username || !password){  //if any of the field is Empty...
        return res.status(400).json({error:"Plz filled the Data properly"});
    };
    try{
        let token;
        const userLogin = await User.findOne({username,password});
        //console.log(userLogin);
     
        token = await userLogin.generateAuthToken();
    
        res.cookie('jwtoken',token,{
            expires: new Date(Date.now()+ 253034600),
            httpOnly: true,
        })
       
        if(userLogin){
            return res.status(200).json({data:userLogin,message:'User LoggedIn Successfully'});
        }else{
            return res.status(401).json({message:'Bad or Invalid Request'});
        }
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

export const userData = async(req,res)=>{

  // console.log(!req.rootUser);
   if(!req.rootUser){
        res.send("Please login first")
   }else{
    res.send(req.rootUser)
   }
    
}

export const userLogout = async(req,res)=>{
    //console.log(`helllo my Logout Page`);
    res.clearCookie('jwtoken',{path:'/'});
    res.status(200).send('User Logout Successfull');
}

export const userOrders = async ( req, res ) =>{
   
    try{

        const {address,payment,cart} = req.body 

        if(!address || !payment || !cart){
            return res.status(400).json({error:"Plzz filled the Order details"});
        }

        const userContact = await User.findOne({_id : req.userID});

        if(userContact){
            const userOrder = await userContact.addOrders(address,payment,cart);

            await userContact.save();
            res.status(201).json({message:"User Order successfully"});
        }else{
            res.status(400).json({message:"User is NOT Exist"})
        }

    }catch(err){
            console.log(err);
    }
}

export const deleteUser = async(req,res) =>{
    try{
        const _id = req.params.id;
        const deleteUser = await User.findByIdAndDelete(_id);
        res.status(200).json({message:'User De-registered Successfully'});

    }catch(err){
        res.status(400).send(err);
    }
}

// export const userSignin = async(req,res,next) =>{
//     const {username, password} = req.body;

//     if(!username || !password){  //if any of the field is Empty...
//         return res.status(400).json({error:"Plz filled the Data properly"});
//     };

// try{ 
//     let token;
//     const userLogin = await User.findOne({username,password});
//     //console.log(userLogin);
 
//     token = await userLogin.generateAuthToken();
//     //console.log(token);
 
//     //res.cookie(`Cookie token name`,`encrypted cookie string Value`);
       
  
//     res.cookie('jwtoken',token,{
//         expires: new Date(Date.now()+ 253034600),
//         httpOnly: true,
//     })

//     userLogin && password ? res.status(200).json({message:"User logIn Successfully"}) : res.status(400).json({error: "Invalid Credentials"});

// }catch(err){
//     console.log(err);
// }
// }
