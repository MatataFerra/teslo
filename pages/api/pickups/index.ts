import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { IPickupPoint } from "../../../interfaces";
import { Pickup } from "../../../models";

type Data =
  | {
      message: string;
    }
  | IPickupPoint[];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "GET") {
    return getPickups(req, res);
  }

  res.status(200).json({ message: "Example" });
}

const getPickups = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();

  const pickups = await Pickup.find().lean();
  await db.disconnect();

  if (!pickups) return null;

  return res.status(200).json(pickups);
};
