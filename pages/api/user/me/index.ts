import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../database";
import { User } from "../../../../models";

type Data = { message: string } | { userId: string };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "GET") {
    return getUserId(req, res);
  }

  return res.status(400).json({ message: "Method not allowed" });
}

const getUserId = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { query } = req;

  if (!query.email) {
    return res.status(400).json({ message: "Bad Request" });
  }

  await db.connect();
  const user = await User.findOne({ email: query.email }).select("_id").lean();

  if (!user) {
    await db.disconnect();
    return res.status(400).json({ message: "Bad Request" });
  }

  await db.disconnect();

  return res.status(200).json({ userId: user._id });
};
