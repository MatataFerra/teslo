import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Order } from "../../../models";
import { IOrder } from "../../../interfaces";

type Data = { message: string } | IOrder[] | IOrder;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "GET") {
    return getOrders(req, res);
  }

  return res.status(400).json({ message: "Method not allowed" });
}

const getOrders = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const orders = await Order.find().sort({ createdAt: "desc" }).populate("user", "name email").lean();

  return res.status(200).json(orders);
};
