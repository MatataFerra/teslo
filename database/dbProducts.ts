import { db } from "./";
import { ProductSize } from "../models";
import { IProductSize } from "../interfaces";

export const getProductsBySlug = async (slug: string): Promise<IProductSize | null> => {
  await db.connect();
  const product = await ProductSize.findOne({ slug }).lean();

  if (!product) {
    throw null;
  }

  product.images = product.images.map((image) => {
    return image.includes("http") ? image : `${process.env.VERCEL_URL}products/${image}`;
  });

  return JSON.parse(JSON.stringify(product));
};

interface ProductSlug {
  slug: string;
}

export const getAllProductsBySlug = async (): Promise<ProductSlug[]> => {
  await db.connect();
  const slugs = await ProductSize.find().select("slug -_id").lean();

  if (!slugs) {
    throw null;
  }

  return JSON.parse(JSON.stringify(slugs));
};

export const getAllDataProductsBySlug = async (slug: string[]): Promise<IProductSize[]> => {
  await db.connect();
  const productsData = await ProductSize.find({ slug: { $in: slug } })
    .select("slug images price title _id ")
    .lean();

  if (!productsData) {
    throw null;
  }

  return JSON.parse(JSON.stringify(productsData));
};

export const getProductsByTerms = async (term: string): Promise<IProductSize[]> => {
  await db.connect();
  const termSearch = `/${term.toLowerCase()}/`;

  const products = await ProductSize.find({ title: { $regex: termSearch } })

    .select("title images price slug inStock -_id")
    .lean();

  const updatedProducts = products.map((product) => {
    product.images = product.images.map((image) => {
      return image.includes("http") ? image : `${process.env.VERCEL_URL}products/${image}`;
    });

    return product;
  });

  return updatedProducts;
};

export const getAllProducts = async (): Promise<IProductSize[]> => {
  await db.connect();
  const products = await ProductSize.find().lean();

  const updatedProducts = products.map((product) => {
    product.images = product.images.map((image) => {
      return image.includes("http") ? image : `${process.env.VERCEL_URL}products/${image}`;
    });

    return product;
  });

  return JSON.parse(JSON.stringify(updatedProducts));
};

export const getProductsById = async (ids: string[]): Promise<IProductSize[]> => {
  await db.connect();
  const products = await ProductSize.find({ _id: { $in: ids } })
    .select("title images price slug inStock -_id")
    .lean();

  if (!products) {
    throw null;
  }

  return JSON.parse(JSON.stringify(products));
};
