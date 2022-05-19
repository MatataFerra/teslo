import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { IOrder } from "../../../interfaces";
import { getSession } from "next-auth/react";

import { db } from "../../../database/";
import { Product, Order, ProductSize } from "../../../models";

type Data = { message: string } | IOrder;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "POST") {
    try {
      const order = (await createOrder(req, res)) as IOrder;
      return res.status(201).json(order);
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Revise la consola" });
    }
  }

  if (req.method === "PUT") {
    return updateStatusOrder(req, res);
  }

  return res.status(405).json({ message: "Method not allowed" });
}

async function createOrder(req: NextApiRequest, res: NextApiResponse) {
  const { orderItems, total } = req.body as IOrder;
  const session: any = await getSession({ req });

  if (!session) return res.status(401).json({ message: "Unauthorized" });

  const productsIds = orderItems.map((item) => item._id);

  db.connect();
  const dbProducts = await ProductSize.find({ _id: { $in: productsIds } }).lean();

  try {
    const subTotal = orderItems.reduce((acc, product) => {
      const currentPrice = dbProducts.find((p) => new mongoose.Types.ObjectId(p._id).toString() === product._id)?.price;

      if (!currentPrice) throw new Error("Check cart, maybe some product was removed");

      return acc + currentPrice * product.quantity;
    }, 0);

    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
    const backendTotal = subTotal * (1 + taxRate);

    if (backendTotal !== total) {
      throw new Error("The total of the order does not match the backend total");
    }

    const userId = session.user?._id;
    const newOrder = new Order({ ...req.body, isPaid: false, user: userId });
    newOrder.total = Math.round(newOrder.total * 100) / 100;
    await newOrder.save();
    await db.disconnect();

    return newOrder;
  } catch (error: any) {
    await db.disconnect();
    console.log(error);
    return res.status(400).json({ message: error.message || "Revise la consola" });
  }
}

const updateStatusOrder = async (req: NextApiRequest, res: NextApiResponse) => {
  const { status, orderId } = req.body;

  if (!orderId) return res.status(400).json({ message: "orderId is required" });

  if (!status) return res.status(400).json({ message: "status is required" });

  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(400).json({ message: "Order not found" });
    order.status = status;
    await order.save();

    return res.status(200).json(order);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message || "Revise la consola" });
  }
};
