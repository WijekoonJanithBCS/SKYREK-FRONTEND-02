import express from "express";
import { ChangeUserPassowrd, createUser, getUser, loginuser, updateUserProfile } from "../controllers/usercontroller.js";

const userRouter = express.Router();

userRouter.post("/", createUser)

userRouter.post("/login", loginuser)

userRouter.post("/update-password", ChangeUserPassowrd)

userRouter.get("/profile", getUser )

userRouter.put("/", updateUserProfile)

export default userRouter;
