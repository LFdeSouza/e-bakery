import express from "express";
import { ProductsController } from "../controllers/productsController";

const productsController = new ProductsController();
export const productsRouter = express.Router();

productsRouter.get("/", productsController.getAllProducts);
productsRouter.get("/:id", productsController.getProduct);
