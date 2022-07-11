import express from 'express';
import cors from "cors";
import authRouter from './routes/authRouter.js';
import productRouter from "./routes/productRouter.js";
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(authRouter)
app.use(productRouter)

app.listen(process.env.PORT, () => {
    console.log("Conexão estabelecida");
})
