import express from "express";
import mongoose from "mongoose";
import userRouter from "./Routers/userRouter.js";
import productRouter from "./Routers/productRouter.js";
import jwt from "jsonwebtoken";
import authorizeUser from "./lib/jwtMiddleware.js";


const mongoURI = "mongodb+srv://admin:1234@cluster0.gxuidms.mongodb.net/?appName=Cluster0";

mongoose.connect(mongoURI).then(() => {
  console.log("Connected to MongoDB");
})
.catch((err) => {
  console.error("Error connecting to MongoDB:", err);
}
);

const app = express();

app.use(express.json());

//app.use(authorizeUser);

app.use("/users", userRouter);

app.use("/products", authorizeUser, productRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000...");
});