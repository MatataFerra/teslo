import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { IProduct, IProductSize } from "../../../interfaces";
import { Product, ProductSize } from "../../../models";
import { isValidObjectId } from "mongoose";
import { v2 as cloudinary } from "cloudinary";

type Data = { message: string } | IProductSize[] | IProductSize;
cloudinary.config(process.env.CLOUDINARY_URL || "");

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "GET") {
    return getProducts(req, res);
  }

  if (req.method === "POST") {
    return createProduct(req, res);
  }

  if (req.method === "PUT") {
    return updateProduct(req, res);
  }

  res.status(400).json({ message: "Method not allowed" });
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const products = await ProductSize.find({}).sort({ title: "asc" }).lean();
  await db.disconnect();

  // actualizar imagenes

  const updatedProducts = products.map((product) => {
    product.images = product.images.map((image) => {
      const regex = new RegExp(/https?/g);
      return regex.test(image) ? image : `${process.env.HOST_NAME}products/${image}`;
    });

    return product;
  });

  res.status(200).json(updatedProducts);
};

const updateProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { _id = "", images = [] } = req.body as IProductSize;

  if (!isValidObjectId(_id)) {
    return res.status(400).json({ message: "Invalid id" });
  }

  if (images.length < 2) {
    return res.status(400).json({ message: "You must upload at least 2 images" });
  }

  // TODO: hay que evitar que se cree la ruta de la imagen

  try {
    await db.connect();
    const product = await ProductSize.findById(_id);

    if (!product) {
      await db.disconnect();
      throw new Error("Product not found");
    }

    // TODO: eliminar fotos cloudinary
    product.images.forEach(async (image) => {
      if (!images.includes(image)) {
        const [fileId] = image.substring(image.lastIndexOf("/") + 1).split(".");
        await cloudinary.uploader.destroy(fileId);
      }
    });

    await product.updateOne(req.body);
    await db.disconnect();

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res.status(400).json({ message: "Error updating product" });
  }
};

const createProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { images = [] } = req.body as IProductSize;

  if (images.length < 2) {
    return res.status(400).json({ message: "You must upload at least 2 images" });
  }

  // TODO: hay que evitar que se cree la ruta de la imagen

  try {
    await db.connect();
    const existingProduct = await ProductSize.findOne({ slug: req.body.slug });

    if (existingProduct) {
      await db.disconnect();
      throw new Error("Product already exists with this slug");
    }

    const product = new ProductSize(req.body);
    product.inStock = product.sizes.reduce((acc, size) => acc + size.stock, 0);
    await product.save();
    await db.disconnect();

    return res.status(201).json(product);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res.status(400).json({ message: "Error creating product" });
  }
};
