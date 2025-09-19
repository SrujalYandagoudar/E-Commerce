import { Router } from "express";
import { Login, logOut, signUp } from "../controller/auth.js";
import { verifyToken, adminVerify } from "../middleware/authmiddleware.js";
import { userMe } from "../controller/userMe.js";
import { fatchProducts, getProduct } from "../controller/Productapi.js";
import { addCart, getCart, removeProduct, updateCart } from "../controller/cartapi.js";
import { addWishlist } from "../controller/wishlistapi.js";

const route = Router();

route.post('/login', Login);
route.post('/signUp', signUp);
route.post('/logOut',  logOut);

route.get('/showProducts', fatchProducts);
route.get('/showProducts/:id', getProduct)

route.post('/addCart', verifyToken, addCart)
route.get('/getCart', verifyToken, getCart)
route.post('/updateCart', verifyToken, updateCart)
route.post('/removeCart', verifyToken, removeProduct)

route.post('/addWishlist', verifyToken, addWishlist)

route.get('/profile', verifyToken, userMe)


export default route;