import type { NextApiRequest, NextApiResponse } from "next";
import { isValidObjectId } from "mongoose";
import { db } from "../../../database";
import { IUser } from "../../../interfaces";
import { User } from "../../../models";

type Data = { message: string } | IUser[];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "GET") {
    return getUsers(req, res);
  }

  if (req.method === "PUT") {
    return updateUsers(req, res);
  }

  return res.status(400).json({ message: "Method not allowed" });
}

const getUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const users = await User.find().select("-password -__v").lean();

  if (!users) {
    return res.status(404).json({ message: "No users found" });
  }

  return res.status(200).json(users);
};
const updateUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { userId = "", role = "" } = req.body;

  if (!isValidObjectId(userId)) {
    return res.status(400).json({ message: "Invalid user id" });
  }

  const validRoles = ["client", "admin", "super-admin", "SEO"];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ message: "Invalid role " + validRoles.join(", ") });
  }

  await db.connect();
  const user = await User.findById(userId);

  if (!user) {
    await db.disconnect();
    return res.status(404).json({ message: "User not found" });
  }

  user.role = role;
  await user.save();

  return res.status(200).json({ message: "User updated" });
};
