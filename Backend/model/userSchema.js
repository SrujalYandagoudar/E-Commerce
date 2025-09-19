import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{type:String, required:true},
    password:{type:String, required:true},
    role:{type: String, enum:['admin', 'user'], default:'user'},
    email:{type:String, required:true},

    cart:[{type:mongoose.Schema.Types.ObjectId, ref:"Cart",}],
    wishlist:[{type:mongoose.Schema.Types.ObjectId, ref:"Wishlist"}],
    order:[{type:mongoose.Schema.Types.ObjectId, ref:"Order"}]

    
})

export const User = mongoose.model('User', userSchema);