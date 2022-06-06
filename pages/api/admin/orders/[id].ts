import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../database";
import { IOrder } from "../../../../interfaces";
import { Order } from "../../../../models";

type Data = { message: string } | IOrder;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "PUT") {
    return updateOrderById(req, res);
  }

  return res.status(400).json({ message: "Method not allowed" });
}

const updateOrderById = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const id = req.query.id as string;
  const { status } = req.body;
  db.connect();
  const order = await Order.findById(id);
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  order.status = status;
  await order.save();
  db.disconnect();

  return res.status(200).json(order);
};
