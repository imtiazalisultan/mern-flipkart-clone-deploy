import { products } from "./constant/data.js";

import Product from "./model/productSchema.js";

const defaultData = async() =>{
    try{
        await Product.insertMany(products);
        console.log(`Data is imported Successfully`);
    }catch(err){
        console.log(`Data is not imported; Error is occured at `,err.message);
    }
}

export default defaultData;