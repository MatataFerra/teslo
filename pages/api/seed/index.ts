import type { NextApiRequest, NextApiResponse } from "next";
import { db, seedData } from "../../../database";
import { Product, User } from "../../../models";

type Data = {
  message?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === "production") {
    res.status(401).json({
      error: "No se puede crear una nueva seed en producción",
    });
  }
  await db.connect();

  await User.deleteMany();
  await User.insertMany(seedData.initialData.users);

  await Product.deleteMany();
  await Product.insertMany(seedData.initialData.products);

  await db.disconnect();

  res.status(200).json({ message: "Proceso realizado correctamente" });
}
