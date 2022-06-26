import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { db } from "../../../database";
import { IPaypal } from "../../../interfaces";
import { Order } from "../../../models";

type Data = {
  message: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "POST") {
    return payOrder(req, res);
  }

  return res.status(400).json({ message: "Method not allowed" });
}

const getPayPalBearer = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

  const body = new URLSearchParams("grant_type=client_credentials");
  const base64 = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`, "utf-8").toString("base64");

  try {
    const { data } = await axios.post(process.env.PAYPAL_OAUTH_URL || "", body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${base64}`,
      },
    });

    return data.access_token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
    }
    return null;
  }
};

const payOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  // TODO: validar sesión del usuario
  // TODO: validar mongoId

  const paypalToken = await getPayPalBearer();

  if (!paypalToken) {
    return res.status(500).json({ message: "Could not get PayPal token" });
  }

  const { transactionId = "", orderId = "" } = req.body;

  const { data } = await axios.get<IPaypal.PaypalOrderStatusResponse>(
    `${process.env.PAYPAL_ORDERS_URL}/${transactionId}`,
    {
      headers: {
        Authorization: `Bearer ${paypalToken}`,
      },
    }
  );

  if (data.status !== "COMPLETED") {
    return res.status(500).json({ message: "Pago no reconocido" });
  }

  await db.connect();
  const dbOrder = await Order.findById(orderId);

  if (!dbOrder) {
    await db.disconnect();
    return res.status(400).json({ message: "Orden no existe en DB" });
  }

  if (dbOrder.total !== Number(data.purchase_units[0].amount.value)) {
    await db.disconnect();
    return res.status(400).json({ message: "Los montos de PayPal y la orden no coinciden" });
  }

  dbOrder.transactionId = transactionId;
  dbOrder.isPaid = true;
  await dbOrder.save();

  return res.status(200).json({ message: "Orden pagada con éxito" });
};
