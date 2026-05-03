import express from "express";
import { CreateOrder, GetOrders } from "../controllers/OrderController.js";
import { get } from "mongoose";

const orderRouter = express.Router();

orderRouter.post("/", CreateOrder);

orderRouter.get("/:pageSize/:pageNmuber", GetOrders);



export default orderRouter;