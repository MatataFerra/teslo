import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { User, WishList } from "../../../models";
import bcrypt from "bcryptjs";
import { signToken } from "../../../utils/jwt";
import { validations } from "../../../utils";
import { userApiResponse } from "../../../interfaces";

type Data =
  | { message: string }
  | {
      token: string | Error;
      user: userApiResponse;
    };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "POST") {
    return registerUser(req, res);
  }

  return res.status(400).json({ message: "Bad Request" });
}

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { email = "", password = "", name = "" } = req.body as { [key: string]: string };

  if (password.length < 6) {
    return res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres" });
  }

  if (name.length < 3) {
    return res.status(400).json({ message: "El nombre debe tener al menos 3 caracteres" });
  }

  if (!validations.isValidEmail(email)) {
    return res.status(400).json({ message: "El email no es válido" });
  }

  await db.connect();
  const user = await User.findOne({ email });

  if (user) {
    await db.disconnect();
    return res.status(400).json({ message: "Ya existe un usuario con esa cuenta - EMAIL" });
  }

  const newUser = new User({
    email: email.toLocaleLowerCase(),
    password: bcrypt.hashSync(password, 10),
    role: "client",
    name,
  });

  const wishList = new WishList({
    user: newUser._id,
    products: [],
  });

  try {
    await newUser.save({ validateBeforeSave: true });
    await wishList.save({ validateBeforeSave: true });
  } catch (error) {
    return res.status(500).json({ message: "Error al crear el usuario" });
  }

  const { _id, role } = newUser;
  const token = signToken(_id, email);

  return res.status(200).json({
    token,
    user: {
      role,
      name,
      email,
      active: true,
    },
  });
};
