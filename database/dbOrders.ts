import { isValidObjectId } from "mongoose";
import { db } from ".";
import { IOrder } from "../interfaces";
import { Order } from "../models";

export const getOrderById = async (id: string): Promise<IOrder | null> => {
  if (!isValidObjectId(id)) return null;
  await db.connect();
  const order = await Order.findById(id).lean();

  return JSON.parse(JSON.stringify(order));
};

export const getOrdersByUserId = async (userId: string): Promise<IOrder[]> => {
  if (!isValidObjectId(userId)) return [];
  await db.connect();
  const orders = await Order.find({ user: userId }).lean();

  return JSON.parse(JSON.stringify(orders));
};

export const getLastOrderByUserId = async (userId: string): Promise<IOrder[] | null> => {
  if (!isValidObjectId(userId)) return null;
  await db.connect();
  const order = await Order.find({
    user: userId,
    status: "pending",
  })
    .sort({ createdAt: -1 })
    .limit(3)
    .lean();

  return JSON.parse(JSON.stringify(order));
};
