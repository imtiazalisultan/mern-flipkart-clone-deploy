import Product from '../model/productSchema.js';

export const getProducts = async(req,res)=>{
    try{
        const product = await Product.find({});
        res.status(200).json(product);
    }catch(err){
        res.status(500).json({message:err.message});
    }
}

export const getProductDetails = async(req,res) =>{
    try{
        const { id } = req.params;
        const productDetails = await Product.findOne({id});
        res.status(200).json(productDetails)
    }catch(err){
        res.status(500).json({message:err.message})
    }
}