import { Request, response, Response } from "express";
import { prisma } from "../app";
import { ICartItem } from "../types/IOrder";

export class OrdersController {
  async newOrder(req: Request, res: Response) {
    try {
      const userId = res.locals.token.user;
      const productId = req.body.productId;

      const order = await prisma.order.findFirst({
        where: { AND: { userId, productId } },
      });

      if (order) {
        throw Error("Cannot add two equal orders");
      }

      const newOrder = await prisma.order.create({
        data: { productId, userId, quantity: 1 },
        select: { product: productId, quantity: true, id: true },
      });

      return res.status(201).json({ newOrder });
    } catch (err) {
      OrdersController.handleErrors(err, res);
    }
  }

  async updateQuantity(req: Request, res: Response) {
    try {
      const id = req.params.orderId;
      const operation = req.body.operation;

      const order = await prisma.order.findUnique({ where: { id } });
      if (operation === "decrement" && order?.quantity === 1) {
        await prisma.order.delete({ where: { id } });
      } else {
        await prisma.order.update({
          where: { id },
          data: {
            quantity:
              operation === "increment"
                ? { increment: 1 }
                : operation === "decrement"
                ? { decrement: 1 }
                : {},
          },
        });
      }

      return res.status(200).json({ msg: "Operation successul" });
    } catch (err) {
      OrdersController.handleErrors(err, res);
    }
  }

  async removeItem(req: Request, res: Response) {
    try {
      const id = req.params.orderId;

      await prisma.order.delete({
        where: { id },
      });

      return res.status(200).json({ msg: "Operation successul" });
    } catch (err) {
      OrdersController.handleErrors(err, res);
    }
  }

  async clearCart(req: Request, res: Response) {
    try {
      const userId = res.locals.token.user;

      const orders = await prisma.order.deleteMany({
        where: { userId },
      });

      const user = await prisma.user.findUnique({ where: { id: userId } });
      return res.status(200).json({ user });
    } catch (err) {
      OrdersController.handleErrors(err, res);
    }
  }

  async syncOrders(req: Request, res: Response) {
    try {
      const orders: ICartItem[] = req.body.orders;
      const userId: string = req.body.userId;

      orders.forEach(async (order) => {
        const newOrder = await prisma.order.create({
          data: {
            id: order.id,
            userId,
            quantity: order.quantity,
            productId: order.product.id,
          },
        });
      });

      return res.status(201).json({ msg: "Created" });
    } catch (err) {
      OrdersController.handleErrors(err, res);
    }
  }

  private static handleErrors(err: any, res: Response) {
    if (err.code === "P2003") {
      console.log(err);
      return res.status(400).json({ msg: "Product does not exist" });
    }
    if (err.code === "P2025") {
      console.log(err);
      return res.status(400).json({ msg: "Record not found in database" });
    }
    if (err.message === "Cannot add two equal orders") {
      console.log(err);
      return res.status(400).json({ msg: "Cannot add two equal orders" });
    }
    console.log(err);
    return res.status(400).json({ err });
  }
}
