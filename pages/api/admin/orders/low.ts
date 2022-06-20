import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../database";
import { IOrder } from "../../../../interfaces";
import { Order } from "../../../../models";

type Data =
  | {
      message: string;
    }
  | IOrder[]
  | IOrder;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "GET") {
    return getLowStockOrders(req, res);
  }

  res.status(200).json({ message: "Example" });
}

const getLowStockOrders = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const orders = await Order.find({
    "products.quantity": { $lte: 2 },
  })
    .populate("user", "name email")
    .lean();
  await db.disconnect();

  return res.status(200).json(orders);
};
