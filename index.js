import express from "express";
import mongoose from "mongoose";
import userRouter from "./Routers/userRouter.js";
import productRouter from "./Routers/productRouter.js";
import jwt from "jsonwebtoken";


const mongoURI = "mongodb+srv://admin:1234@cluster0.gxuidms.mongodb.net/?appName=Cluster0";

mongoose.connect(mongoURI).then(() => {
  console.log("Connected to MongoDB");
})
.catch((err) => {
  console.error("Error connecting to MongoDB:", err);
}
);

let app = express();

app.use(express.json());

app.use((req, res, next)=> {
    const header= req.headers['authorization'];
    if(header != null){
        const token = header.replace("Bearer ", "");
        

        jwt.verify(token, "i-computers-54!", (err, decoded)=>{
            console.log(decoded);
            req.user= decoded;
        });
    }
    
    next();

    
    
});

app.use("/users", userRouter);

app.use("/products", productRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000...");
});