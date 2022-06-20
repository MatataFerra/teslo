import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { IProductSize } from "../../../interfaces";
import { ProductSize } from "../../../models";

type Data = { message: string } | IProductSize[] | IProductSize;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "POST") {
    return createProduct(req, res);
  }

  res.status(400).json({ message: "Method not allowed" });
}

const createProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { images = [] } = req.body as IProductSize;

  if (images.length < 2) {
    return res.status(400).json({ message: "You must upload at least 2 images" });
  }

  try {
    await db.connect();
    const existingProduct = await ProductSize.findOne({ slug: req.body.slug });

    if (existingProduct) {
      await db.disconnect();
      throw new Error("Product already exists with this slug");
    }

    const product = new ProductSize(req.body);
    await product.save();
    await db.disconnect();

    return res.status(201).json(product);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res.status(400).json({ message: "Error creating product" });
  }
};
