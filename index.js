import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import mongoose from 'mongoose';
import productRoutes from './routes/productRouter.js';
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'

dotenv.config();


const app = express();
//CORS
app.use(cors({origin: '*'}));

app.use(express.json())

app.use('/api/products', productRoutes) 
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req,res) => {
    res.send(process.env.PAYPAL_CLIENT_ID)
})

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound);
app.use(errorHandler);

const msg="<div><h1>Welcome to CheGo API</h1></div>"

app.get('/', function (req, res) {
  res.send(`${msg}`);
})





//port
const PORT=process.env.PORT || 9000;

const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI,{
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    });
      console.log("Connected to mongoDB.");
    } catch (error) {
      throw error;
    }
  };
  mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
  });

  app.listen(PORT, ()=>{
    connect();
    console.log(`Server is running on ${PORT}`)
})



