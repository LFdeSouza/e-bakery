import { PrismaClient } from "@prisma/client";
import { products } from "./products";

const prisma = new PrismaClient();

async function main() {
  products.forEach(async (product) => {
    await prisma.product.create({
      data: product,
    });
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
