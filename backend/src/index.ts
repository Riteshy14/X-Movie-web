import express from 'express'
import UserRouter from './routes/userRoute.js';
import { movieRouter } from './routes/movieRoute.js';
import { SubscriptionRouter } from './routes/subscription.js';
import dotenv from 'dotenv';
import cors from 'cors'

const app = express();
app.use(cors())

dotenv.config();
app.use(express.json());

app.use('/api/user', UserRouter)
app.use('/api/movie', movieRouter)
app.use('/api/subscription', SubscriptionRouter)

app.get('/', (req,res)=>{
    res.json({
        message:"server is running "
    })
})

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log("server is running on port 3k")
})