import { IProductSize } from "../interfaces/products";

export const parseImagesOnProducts = (products: IProductSize[]) => {
  /**Parse images. If you have images on cloud and local you must  need to parse the array  */
  return products.map((product) => {
    product.images = product?.images?.map((image) => {
      return image.includes("http") ? image : `${process.env.NEXT_PUBLIC_VERCEL_URL}products/${image}`;
    });

    return product;
  });
};
