import type { NextApiRequest, NextApiResponse } from "next";
import { User, WishList, ProductSize } from "../../../models";
import { isValidObjectId } from "mongoose";
import { db } from "../../../database";
import { IWishlist } from "../../../interfaces/wishlist";
import { getSession } from "next-auth/react";

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
  const params = req.query;
  const data = (await getSession({ req })) as any;

  const id = !data ? params.userId : data.user._id;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid Id" });
  }

  await db.connect();
  const user = await User.findById(id).lean();

  if (!user) {
    await db.disconnect();
    return res.status(400).json({ message: "User not found" });
  }

  const wishlistProducts = (await WishList.findOne({ user: id })) as any;
  await db.disconnect();

  return res.status(200).json(wishlistProducts);
};

const updateWishlistUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const cookies = req.cookies;
  const session = (await getSession({ req })) as any;

  if (!isValidObjectId(session?.user._id)) {
    return res.status(400).json({ message: "No valid Id" });
  }

  await db.connect();

  const user = await User.findById(session?.user._id).lean();

  if (!user) {
    await db.disconnect();
    return res.status(400).json({ message: "User not found" });
  }

  const wishlistProducts = (await WishList.findOne({ user: session?.user._id })) as any;
  const wishListCookies = JSON.parse(cookies.wishlist);
  const products = await ProductSize.find({ slug: { $in: wishListCookies } })
    .select("_id slug")
    .lean();

  wishlistProducts.products = products.map((item: any) => item._id);
  await wishlistProducts.save();

  await db.disconnect();

  return res.status(200).json({ message: "Success" });
};
