import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import ProductRouter from './routes/product.js';
import UserRouter from './routes/user.js';
import cors from 'cors'; 

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({ origin: "http://localhost:3000" }));

app.use('/api/products', ProductRouter);
app.use('/api/users', UserRouter);



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});