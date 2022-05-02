import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Order } from "../../../models";
import { IOrder } from "../../../interfaces";

type Data = { message: string } | IOrder[];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "GET") {
    getOrders(req, res);
  }

  res.status(400).json({ message: "Method not allowed" });
}

const getOrders = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const orders = await Order.find().sort({ createdAt: -1 }).populate("user", "name email").lean();
  await db.disconnect();

  return res.status(200).json(orders);
};
