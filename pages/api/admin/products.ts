import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { IProduct } from "../../../interfaces";
import { Product } from "../../../models";

type Data = { message: string } | IProduct[];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "GET") {
    return getProducts(req, res);
  }

  if (req.method === "POST") {
  }

  if (req.method === "PUT") {
  }

  res.status(400).json({ message: "Method not allowed" });
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const products = await Product.find({}).sort({ title: "asc" }).lean();
  await db.disconnect();

  // actualizar imagenes

  res.status(200).json(products);
};
