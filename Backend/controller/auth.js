import { trusted } from "mongoose";
import { User } from "../model/userSchema.js";
import { generateToken } from "../utils/jwt.js";

export async function Login(req, res) {
    try{
        const {username, password, role} = req.body;

        const exist = await User.findOne({username});

        if(!exist){
            return res.json({message:'User Not Found', status:404});
        }
        
        const valid = await User.findOne({username, password});
        if(!valid){
            return res.json({message:'Your Username and Password Missmatch', status:404});
        }

        const token = generateToken(exist);
        res.cookie('token', token, {
            httpOnly:true,
             secure: process.env.NODE_ENV === "production",
            sameSite:"strict",
            maxAge:24*60*60*1000
        })
        
        return res.json({message:'Your Login', status:201, token, exist});
        
    }catch(error){
        return res.json({message:'Internal Server error', status:501})
    }
}

export async function logOut(req, res) {
    res.clearCookie("token");
    res.json({message:"Your Loged Out Sucessfully", status:201})
}

export async function signUp(req, res) {
    try {
        const { username, password } = req.body;

        const exist = await User.findOne({ username });
        if (exist) {
            return res.json({ message: 'User already Exists', status: 501 });
        }

        const newUser = await User.create({ username, password });
        const token = generateToken(newUser);

        res.cookie('token', token, {
            httpOnly: true,
             secure: process.env.NODE_ENV === "production",
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        });
       
        return res.json({ message: 'User added Successfully', status: 201, token, newUser });
    } catch (error) {
        return res.json({ message: 'Internal Server Error', status: 501 });
    }
}
