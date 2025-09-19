import { Cart } from "../model/CartSchema.js";
import { Product } from "../model/productSchema.js";

export async function addCart(req, res) {
    try {

        const userId = req.user.id;
        const { productId, quantity } = req.body;

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: 'Product Not Found' });

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({ user: userId, items: [], totalPrice: 0 });
        }
        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity })
        }

        cart.totalPrice = await calculateTotal(cart.items)
        await cart.save();
        return res.status(201).json({ message: 'Product is Added' })
    } catch (error) {
        return res.status(501).json({ message: 'Internal Server Error' })
    }
}

export async function getCart(req, res) {
    try {
        const userId = req.user.id;
        const product = await Cart.findOne({ user: userId }).populate('items.product')

        if (!product) return res.status(404).json({ message: 'No Products In Cart' });

        return res.status(201).json({ product, totalPrice: product.totalPrice })

    } catch (error) {
        return res.status(501).json({ message: "Internal Server Error" });
    }
}

export async function updateCart(req, res) {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;

        const cart = await Cart.findOne({ user: userId }).populate("items.product");

        if (!cart) return res.status(404).json({ message: 'Cart Not Found' });

        const itemIndex = cart.items.findIndex((item) => item.product._id.toString() === productId);
        if (itemIndex === -1) return res.status(404).json({ message: 'Product Not Found' });

        cart.items[itemIndex].quantity = quantity;
        cart.totalPrice = await calculateTotal(cart.items);
        await cart.save();
        return res.status(201).json({ message: 'Cart is updated', cart })
    } catch (error) {
        console.log(error)
        return res.status(501).json({ message: 'Inernal Server Error' })
    }

}

export async function removeProduct(req, res){
    try{
        const userId = req.user.id;
        const {productId} = req.body;

        const cart = await Cart.findOne({user:userId});
        if(!cart) return res.status(404).json({message:'Cart Not Found'})
        
        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        console.log(itemIndex);
        
        if(itemIndex === -1) return res.status(404).json({message:'Product Not Found'});

        await cart.items.splice(itemIndex,1);
        cart.totalPrice = await calculateTotal(cart.items)
        await cart.save();

        return res.status(201).json({message:'Product Remover Suceesfully'})

    }catch(error){
        console.log(error);
        return res.status(501).json({message:'Internal Server Error'})
        
    }
}


async function calculateTotal(items) {
    let total = 0;
    for (const item of items) {
        const product = await Product.findById(item.product);
        if (product) total += product.price * item.quantity;
    }
    return total;
}