import express from 'express';
import { Createproduct, deleteProduct, getProducts, updateProduct } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post("/", Createproduct);

productRouter.get("/", getProducts);

productRouter.delete("/:productId", deleteProduct);

productRouter.put("/:productId", updateProduct);

export default productRouter;