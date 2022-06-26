import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../database";
import { IPickupPoint } from "../../../../interfaces";
import { Pickup } from "../../../../models";

type Data =
  | {
      message: string;
    }
  | IPickupPoint;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "POST") {
    return createPickup(req, res);
  }

  res.status(400).json({ message: "Method not allowed" });
}

const createPickup = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();

  const findPickup = await Pickup.findOne({ name: req.body.name });

  if (findPickup) {
    return res.status(400).json({ message: "Pickup already exists" });
  }

  const pickup = await Pickup.create(req.body);

  if (!pickup) return null;

  return res.status(200).json(pickup);
};
