import express from "express";
import { createUser } from "../controllers/usercontroller.js";

const userRouter = express.Router();

userRouter.post("/", createUser)

export default userRouter;
