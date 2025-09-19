import express from 'express';
import route from './route/route.js';
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
app.use(cors({
  origin: "http://localhost:5173", // 🚀 no trailing slash
  credentials: true               // 🚀 allow cookies
}));

app.use(express.json());
app.use(cookieParser())
app.use('/api/auth', route);

export default app;