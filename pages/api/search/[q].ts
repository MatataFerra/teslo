import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { IProductSize } from "../../../interfaces";
import { ProductSize } from "../../../models";

type Data =
  | {
      message: string;
    }
  | IProductSize[];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "GET") {
    return searchProducts(req, res);
  }

  res.status(400).json({ message: "Bad request" });
}

const searchProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { q = "" } = req.query;
  if (!q) {
    return res.status(400).json({ message: "Bad request" });
  }

  await db.connect();
  const products = await ProductSize.find({
    $text: { $search: q.toString().toLowerCase() },
  })
    .select("title images price slug inStock -_id")
    .lean();

  return res.status(200).json(products);
};
