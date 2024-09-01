import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import prismaClient from "./db/index.js";

import userRouter from "./routes/userRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/user",userRouter);


prismaClient.$connect().then(()=>{
    app.listen(3000,()=>{
        console.log("Conectado !");
    })
})

//export default app;

