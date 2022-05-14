import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { db } from "../../../database";
import { IProduct } from "../../../interfaces";
import Product from "../../../models/Product";

type Data =
  | {
      name: string;
    }
  | IProduct;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "GET") {
    return getProductsBySlug(req, res);
  }

  if (req.method === "PUT") {
    return updateProductBySlug(req, res);
  }

  res.status(400).json({ name: "Method not Allowed" });
}
const getProductsBySlug = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const { slug } = req.query;
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();

  if (!product) {
    return res.status(404).json({ name: "Product not found" });
  }

  product.images = product.images.map((image) => {
    return image.includes("http") ? image : `${process.env.HOST_NAME}products/${image}`;
  });

  return res.status(200).json(product);
};

const updateProductBySlug = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { slug } = req.query;
  const { inStock } = req.body;
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session) {
    return res.status(401).json({ name: "You can't update this product" });
  }

  if (!inStock) {
    return res.status(400).json({ name: "Bad request" });
  }

  await db.connect();
  const product = await Product.findOneAndUpdate({ slug }, { inStock }, { new: true }).lean();

  if (!product) {
    await db.disconnect();
    return res.status(404).json({ name: "Product not found" });
  }

  await db.disconnect();

  return res.status(200).json(product);
};
