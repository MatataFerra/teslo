import { db } from "./";
import { Product } from "../models";
import { IProduct } from "../interfaces";

export const getProductsBySlug = async (
  slug: string
): Promise<IProduct | null> => {
  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();

  if (!product) {
    throw null;
  }

  return JSON.parse(JSON.stringify(product));
};

interface ProductSlug {
  slug: string;
}

export const getAllProductsBySlug = async (): Promise<ProductSlug[]> => {
  await db.connect();
  const slugs = await Product.find().select("slug -_id").lean();
  await db.disconnect();

  if (!slugs) {
    throw null;
  }

  return JSON.parse(JSON.stringify(slugs));
};
