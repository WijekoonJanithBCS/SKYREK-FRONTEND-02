import express from "express";
import mongoose from "mongoose";
import userRouter from "./Routers/userRouter.js";
import productRouter from "./Routers/productRouter.js";
import jwt from "jsonwebtoken";
import authorizeUser from "./lib/jwtMiddleware.js";
import cors from 'cors';
import dotenv from 'dotenv'
dotenv.config()

import dns from "node:dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);


const mongoURI = process.env.MONGO_URI

mongoose.connect(mongoURI).then(() => {
  console.log("Connected to MongoDB");
})
.catch((err) => {
  console.error("Error connecting to MongoDB:", err);
}
);

const app = express();

app.use(cors())

app.use(express.json());

//app.use(authorizeUser);

app.use("/api/users", userRouter);

app.use("/api/products", authorizeUser, productRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000...");
});