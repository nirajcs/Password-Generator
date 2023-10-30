import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { notFound,errorHandler } from './middlewares/errorMiddleware.js';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js'

dotenv.config();

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
  }));

app.use('/api/users',userRoutes);

app.get('/',(req,res)=>res.send('Server is ready..'))

app.use(notFound);
app.use(errorHandler)

app.listen(port,()=>console.log(`Server is ready on port ${port}`))