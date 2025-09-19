import { User } from "../model/userSchema.js";

export async function userMe(req, res) {
    try{
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');

        if(!user){
            return res.status(404).json({message:'User Not Found'});
        }

        return res.status(201).json({user})
    }catch(error){
        return res.status(501).json({message:'Api Problem'})
    }
}