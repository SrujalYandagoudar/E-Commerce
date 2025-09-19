import jwt from 'jsonwebtoken'
import { User } from '../model/userSchema.js'

export async function verifyToken(req, res, next) {
    try {
        const token = req.cookies.token;
        // const token = req.headers.authorization?.split(" ")[1]; 

        if (!token) return res.json({ message: 'Token not found', status: 404 });

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decode.id).select("-password");

        if (!req.user) {
            return res.json({ message: 'User not found', status: 404 });
        }

        next();
    } catch (error) {
        return res.json({ message: 'Not Authorized Token', status: 404 });
    }
}
export async function adminVerify(req, res, next) {
    try {
        if (req.user?.role === 'admin') {
            return next();
        } else {
            return res.json({ message: 'You are not Admin', status: 403 });
        }
    } catch (error) {
        return res.json({ message: 'Authorization error', status: 500 });
    }
}
