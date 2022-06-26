import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { User } from "../../../models";
import bcrypt from "bcryptjs";
import { signToken } from "../../../utils/jwt";
import { userApiResponse } from "../../../interfaces";

type Data =
  | { message: string }
  | {
      token: string | Error;
      user: userApiResponse;
    };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "POST") {
    return loginUser(req, res);
  }

  return res.status(400).json({ message: "Bad Request" });
}

const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { email = "", password = "" } = req.body;

  await db.connect();
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Usuario o correo no válidos" });
  }

  if (!bcrypt.compareSync(password, user.password!)) {
    return res.status(400).json({ message: "Usuario o correo no válidos" });
  }

  const { role, name, _id, active } = user;
  const token = signToken(_id, email);

  return res.status(200).json({
    token,
    user: {
      role,
      name,
      email,
      active,
    },
  });
};
