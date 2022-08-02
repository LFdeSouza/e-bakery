import express from "express";
import { OrdersController } from "../controllers/ordersController";
import { requireAuth } from "../middleware/auth";

const orderController = new OrdersController();
export const orderRouter = express.Router();

orderRouter.post("/", requireAuth, orderController.newOrder);
orderRouter.put("/:orderId", requireAuth, orderController.updateQuantity);
orderRouter.delete("/:orderId", requireAuth, orderController.removeItem);
orderRouter.delete("/", requireAuth, orderController.clearCart);
orderRouter.post("/syncOrders", orderController.syncOrders);
