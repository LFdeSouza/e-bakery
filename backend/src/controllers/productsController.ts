import { Request, Response } from "express";
import { prisma } from "../app";

export class ProductsController {
  async getAllProducts(req: Request, res: Response) {
    try {
      const products = await prisma.product.findMany();
      return res.status(200).json({ products });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Something went wrong" });
    }
  }
  async getProduct(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const product = await prisma.product.findUnique({
        where: { id },
      });

      if (!product) {
        return res.status(400).json({ msg: "Product not found" });
      }
      return res.status(200).json({ product });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Something went wrong" });
    }
  }
}
