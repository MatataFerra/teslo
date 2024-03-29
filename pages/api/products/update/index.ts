import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { db } from "../../../../database";
import { IOrder, IOrderItems } from "../../../../interfaces";
import { ProductSize, Order } from "../../../../models";

type Data = { message: string } | IOrder;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== "PUT") {
    return res.status(400).json({ message: "Method not Allowed" });
  }

  return updateProductByOrder(req, res);
}

// TODO: El estado de la orden tienen que ser en proceso o disinta a pending

const updateProductByOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { orderItems } = req.body as { orderItems: IOrderItems[] };
  const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET || "" });

  if (!session) {
    return res.status(401).json({ message: "You can't update this product" });
  }

  if (!session?.user.active) {
    return res.status(400).json({ message: "User not active" });
  }

  await db.connect();

  try {
    orderItems.forEach(async (orderItem) => {
      const product = await ProductSize.findOne({ _id: orderItem._id });

      if (!product) {
        return orderItem;
      }

      if (!orderItem.quantity) return orderItem;

      product.sizes = product.sizes.map((size) => {
        if (size.size === orderItem.size?.size) {
          size.stock = size.stock + orderItem.quantity;
        }
        return size;
      });

      product.inStock = product.sizes.reduce((acc, size) => {
        return acc + size.stock;
      }, 0);

      await product.save();
    });

    return res.status(200).json({ message: "OK" });
  } catch (error) {
    await db.disconnect();
    return res.status(500).json({ message: "Error updating order" });
  }
};
