import express from "express";
import { PrismaClient } from "@prisma/client";
import { productsRouter } from "./routes/products.routes";
import cookieParser from "cookie-parser";
import { userRouter } from "./routes/user.routes";
import { orderRouter } from "./routes/orders.routes";

const app = express();
export const prisma = new PrismaClient();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/products", productsRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

app.listen(process.env.PORT || 5000, () =>
  console.log(`App listening on port 5000`)
);
