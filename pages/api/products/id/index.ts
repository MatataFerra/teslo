import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../database";
import { ProductSize } from "../../../../models";
import { IProductSize } from "../../../../interfaces/products";

type Data =
  | {
      message: string;
    }
  | IProductSize[];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "GET") {
    return getProductsById(req, res);
  }

  res.status(200).json({ message: "Method not allowed" });
}

const getProductsById = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const ids = JSON.parse(req.cookies.userdataproducts);

  if (!ids) {
    return res.status(400).json({ message: "Bad Request" });
  }

  await db.connect();
  const products = await ProductSize.find({ _id: { $in: ids } })
    .select("title images price inStock slug -_id")
    .lean();

  if (!products) {
    return res.status(400).json({ message: "Bad Request" });
  }

  return res.status(200).json(products);
};
