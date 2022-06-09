import type { NextApiRequest, NextApiResponse } from "next";
import { User, WishList, ProductSize } from "../../../models";
import { isValidObjectId } from "mongoose";
import { db } from "../../../database";
import { IWishlist } from "../../../interfaces/wishlist";

type Data =
  | {
      message: string;
    }
  | IWishlist;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { body } = req as { body: { cookie: string; userId: string } };

  if (req.method === "PUT") {
    return updateWishlistUser(req, res);
  }

  if (req.method === "GET") {
    return getWishlistUser(req, res);
  }

  res.status(400).json({ message: "Method not allowed" });
}

const getWishlistUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const params = req.query as { userId: string };

  if (!isValidObjectId(params.userId)) {
    return res.status(400).json({ message: "Invalid Id" });
  }

  await db.connect();

  const user = await User.findById(params.userId).lean();

  if (!user) {
    await db.disconnect();
    return res.status(400).json({ message: "User not found" });
  }

  const wishlistProducts = (await WishList.findOne({ userId: params.userId })) as any;

  await db.disconnect();

  return res.status(200).json(wishlistProducts);
};

const updateWishlistUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { body } = req as { body: { cookies: string; userId: string } };

  if (!isValidObjectId(body.userId)) {
    return res.status(400).json({ message: "No valid Id" });
  }

  await db.connect();

  const user = await User.findById(body.userId).lean();

  if (!user) {
    await db.disconnect();
    return res.status(400).json({ message: "User not found" });
  }

  const wishlistProducts = (await WishList.findOne({ userId: body.userId })) as any;
  const wishListCookies = JSON.parse(body.cookies);
  const products = await ProductSize.find({ slug: { $in: wishListCookies } })
    .select("_id slug")
    .lean();

  wishlistProducts.products.sort();
  products.sort();

  if (products.every((item: any, index: number) => item.slug === wishlistProducts.products[index])) {
    await db.disconnect();
    return res.status(200).json({ message: "OK" });
  }

  wishlistProducts.products = products.map((item: any) => item._id);
  await wishlistProducts.save();

  await db.disconnect();

  return res.status(200).json({ message: "Success" });
};
