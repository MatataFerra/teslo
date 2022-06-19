import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { User } from "../../../models";
import { jwt } from "../../../utils";
import { userApiResponse } from "../../../interfaces";

type Data =
  | { message: string }
  | {
      token: string | Error;
      user: userApiResponse;
    };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "POST") {
    return checkJWT(req, res);
  }

  return res.status(400).json({ message: "Bad Request" });
}

const checkJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { token = "" } = req.cookies;

  try {
    const decoded = await jwt.isValidToken(token);
    const { _id } = decoded;

    await db.connect();
    const user = await User.findById({ _id }).lean();
    await db.disconnect();

    if (!user) {
      return res.status(400).json({ message: "Usuario o correo no válidos - EMAIL" });
    }

    const { role, name, email } = user;

    return res.status(200).json({
      token: jwt.signToken(_id, email),
      user: {
        role,
        name,
        email,
        active: true,
      },
    });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
