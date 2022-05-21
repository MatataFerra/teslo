import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { db } from "../../../database";
import { IProductSize, ISizeStock } from "../../../interfaces";
import { ProductSize } from "../../../models";

type Data =
  | {
      message: string;
    }
  | IProductSize;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "GET") {
    return getProductsBySlug(req, res);
  }

  if (req.method === "PUT") {
    return updateProductBySlug(req, res);
  }

  res.status(400).json({ message: "Method not Allowed" });
}
const getProductsBySlug = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const { slug } = req.query;
  const product = await ProductSize.findOne({ slug }).lean();
  await db.disconnect();

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  product.images = product.images.map((image) => {
    return image.includes("http") ? image : `${process.env.HOST_NAME}products/${image}`;
  });

  return res.status(200).json(product);
};

const updateProductBySlug = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { slug } = req.query;
  const sizeStock = req.body as ISizeStock;
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session) {
    return res.status(401).json({ message: "You can't update this product" });
  }

  if (!sizeStock) {
    return res.status(400).json({ message: "You don't send any value to update stock" });
  }

  await db.connect();
  const product = await ProductSize.findOne({ slug });

  if (!product) {
    await db.disconnect();
    return res.status(404).json({ message: "Product not found" });
  }

  product.sizes.forEach((size) => {
    if (size.size === sizeStock.size) {
      size.stock = sizeStock.stock;
    }

    product.inStock = product.sizes.reduce((acc, size) => acc + size.stock, 0);
  });

  product.save();

  await db.disconnect();

  return res.status(200).json(product);
};
