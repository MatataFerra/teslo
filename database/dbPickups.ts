import { db } from ".";
import { IPickupPoint } from "../interfaces";
import { Pickup } from "../models";

export const getPickups = async (): Promise<IPickupPoint | null> => {
  await db.connect();
  const pickups = await Pickup.find().lean();

  if (!pickups) return null;

  return JSON.parse(JSON.stringify(pickups));
};
