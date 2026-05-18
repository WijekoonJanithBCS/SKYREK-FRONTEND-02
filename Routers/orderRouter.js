import express from "express";
import { CreateOrder, GetOrders, updateOrderStatusAndNotes } from "../controllers/OrderController.js";
import { get } from "mongoose";

const orderRouter = express.Router();

orderRouter.post("/", CreateOrder);

orderRouter.get("/:pageSize/:pageNmuber", GetOrders);

orderRouter.put("/:orderId", updateOrderStatusAndNotes);

export default orderRouter;