import express from 'express';
import { Createproduct } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post("/", Createproduct);

export default productRouter;