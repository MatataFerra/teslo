import type { NextApiRequest, NextApiResponse } from "next";
import { db, SHOP_CONSTANTS } from "../../../database";
import { IProduct, IProductSize } from "../../../interfaces";
import { Product, ProductSize } from "../../../models";

type Data = { message: string } | IProductSize[];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "GET") {
    return getProducts(req, res);
  }

  res.status(400).json({ message: "Method not allowed" });
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { gender = "all" } = req.query;
  let condition = {};

  if (gender !== "all" && SHOP_CONSTANTS.validGenders.includes(gender.toString())) {
    condition = { gender };
  }

  await db.connect();

  const products = await ProductSize.find(condition).select("title images price inStock slug -_id").lean();
  await db.disconnect();

  const updatedProducts = products.map((product) => {
    product.images = product.images.map((image) => {
      return image.includes("http") ? image : `${process.env.HOST_NAME}products/${image}`;
    });

    return product;
  });

  return res.status(200).json(updatedProducts);
};
