import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Order, Product, User, ProductSize } from "../../../models";
import { DashboardSummaryResponse } from "../../../interfaces";

type Data = DashboardSummaryResponse | { message: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== "GET") {
    res.status(400).json({ message: "Method not allowed" });
  }

  try {
    const {
      numberOfOrders,
      paidOrders,
      notPaidOrders,
      numberOfClients,
      numberOfProducts,
      productsWithNoInventory,
      lowInventory,
    } = await getDashboardData();
    return res.status(200).json({
      numberOfOrders,
      paidOrders,
      notPaidOrders,
      numberOfClients,
      numberOfProducts,
      productsWithNoInventory,
      lowInventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Revise la consola" });
  }
}

const getDashboardData = async () => {
  await db.connect();
  const [orders, clients, products] = await Promise.all([
    Order.find({}).lean(),
    User.find({ role: "client" }).lean(),
    ProductSize.find({}).lean(),
  ]);

  await db.disconnect();

  if (!orders || !clients || !products) {
    throw new Error("No se pudo obtener los datos");
  }

  const numberOfOrders = orders.length;
  const numberOfClients = clients.length;
  const numberOfProducts = products.length;
  const paidOrders = orders.filter((order) => order.isPaid && order.transactionId).length;
  const notPaidOrders = orders.filter((order) => !order.isPaid).length;
  const productsWithNoInventory = products.filter((product) => product.inStock === 0).length;
  const lowInventory = products.filter((product) => product.inStock <= 10).length;

  return {
    numberOfOrders,
    paidOrders,
    notPaidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
  };
};
