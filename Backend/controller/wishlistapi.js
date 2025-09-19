import { Product } from "../model/productSchema.js";
import { Wishlist } from "../model/wishlistSchema.js";


export async function addWishlist(req, res){
    try{
        const userId = req.user.id;
        const {productId} = req.body;

        const product = await Product.findOne({productId});
        if(!product) return res.status(404).json({message:'Product Not Found'});

        const wishlist = await Wishlist.findOne({user:userId})
        if(!wishlist){
            wishlist = new wishlist({user:userId, products:[]})
        }

        if(!wishlist.products.include(productId)){
            wishlist.products.push(productId);
            await wishlist.save();
        }

        return res.status(201).json({message:'Product Add To Wishlist', Wishlist})


    }catch(error){
        console.log(error)
        return res.status(501).json({message:'Internal Server Error'})
    }
}