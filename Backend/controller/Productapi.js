import { Product } from "../model/productSchema.js";

export async function fatchProducts(req, res){
    try{
        const showProduct = await Product.find();
        return res.status(201).json({showProduct});
    }catch(error){
        return res.status(404).json({message:'Internal Server Error'})
    }
}

export async function getProduct(req, res) {
    try{
        const {id} = req.params;
               
        const product = await Product.findById(id);

        if(!product){
            return res.status(404).json({message:'Product Not Found'});
        }

        return res.status(201).json({product})
    }catch(error){
        return res.status(501).json({message:'Iternal Server Error'})
    }
}