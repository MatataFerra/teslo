import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { IProduct } from "../../../interfaces";
import Product from "../../../models/Product";

type Data =
  | {
      name: string;
    }
  | IProduct;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    return getProductsBySlug(req, res);
  }

  res.status(400).json({ name: "Bad request" });
}
const getProductsBySlug = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  await db.connect();
  const { slug } = req.query;
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();

  if (!product) {
    return res.status(404).json({ name: "Product not found" });
  }

  return res.status(200).json(product);
};
