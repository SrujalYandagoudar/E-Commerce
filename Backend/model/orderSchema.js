import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
    items:[
        {
            products:{type:mongoose.Schema.Types.ObjectId, ref:"Product"},
            quntity:{type:Number, min:0, default:0 },
            price:{type:Number, min:0, default:0}
        }
    ],
    totalAmount:{type:Number, min:0, default:0, required:true},
    status:{
        type:true,
        enum:["pending", "processing", "shipped", "delivered", "cancelled"],
        default:'pending' 
    },
    shippingAddress: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String
  },
})

export const Order = mongoose.model('Order', orderSchema);