import express from 'express';
import cors from "cors";
import authRouter from './routes/authRouter.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(authRouter)

app.listen(process.env.PORT, () => {
    console.log("Conexão estabelecida");
})
