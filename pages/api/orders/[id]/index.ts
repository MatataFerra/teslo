import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../database";
import { IOrder } from "../../../../interfaces";
import { Order } from "../../../../models";

type Data =
  | {
      message: string;
    }
  | IOrder;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "GET") {
    return getOrderById(req, res);
  }

  if (req.method === "PUT") {
    return updateOrderById(req, res);
  }

  res.status(400).json({ message: "Method not allowed" });
}

const getOrderById = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();
  const order = await Order.findById(id).lean();

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  return res.status(200).json(order);
};

const updateOrderById = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query as { id: string };
  const { status } = req.body as { status: string };

  await db.connect();

  try {
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true }).lean();
    if (!order) return res.status(400).json({ message: "Order not found" });

    return res.status(200).json(order);
  } catch (error: any) {
    console.log(error);
    await db.disconnect();
    return res.status(500).json({ message: error.message || "Revise la consola" });
  }
};
