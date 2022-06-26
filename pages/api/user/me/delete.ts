import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { db } from "../../../../database";
import { IUser } from "../../../../interfaces";
import { User } from "../../../../models";

type Data =
  | {
      message: string;
    }
  | IUser;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "PUT") {
    return deleteUser(req, res);
  }

  res.status(400).json({ message: "Method not allowed" });
}

const deleteUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const session: any = await getSession({ req });

  if (!session) {
    return res.status(400).json({ message: "Bad Request" });
  }

  await db.connect();
  const user = await User.findOne({ email: session.user?.email }).select("active email name role");

  if (!user) {
    await db.disconnect();
    return res.status(400).json({ message: "User not found" });
  }

  if (!user.active) {
    return res.status(400).json({ message: "User not active" });
  }

  user.active = false;
  await user.save();

  return res.status(200).json(user);
};
