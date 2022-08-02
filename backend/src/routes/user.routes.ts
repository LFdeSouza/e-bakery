import express from "express";
import { UserController } from "../controllers/userController";
import { requireAuth } from "../middleware/auth";

const userController = new UserController();

export const userRouter = express.Router();

userRouter.get("/loadUser", requireAuth, userController.loadUser);
userRouter.post("/", userController.registerUser);
userRouter.post("/login", userController.login);
userRouter.post("/logout", userController.logout);
userRouter.delete("/", requireAuth, userController.deleteUser);
