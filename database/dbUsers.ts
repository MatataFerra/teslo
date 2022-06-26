import { db } from ".";
import { User } from "../models";
import bcrypt from "bcryptjs";

export const checkUserEmailPassword = async (email: string, password: string) => {
  await db.connect();
  const user = await User.findOne({ email });

  if (!user) return null;

  if (!bcrypt.compareSync(password, user.password ?? "")) return null;

  const { role, name, _id, active } = user;

  return {
    _id,
    email: email.toLocaleLowerCase(),
    role,
    name,
    active,
  };
};

export const oAuthToDbUser = async (oAuthName: string, oAuthEmail: string) => {
  await db.connect();
  const user = await User.findOne({ oAuthEmail });

  if (user) {
    await db.disconnect();
    const { _id, name, email, role, active } = user;
    return { _id, name, email, role, active };
  }

  const newUser = new User({
    name: oAuthName,
    email: oAuthEmail,
    password: "@",
    role: "client",
    active: true,
  });

  await newUser.save();

  const { _id, name, email, role, active } = newUser;

  return { _id, name, email, role, active };
};
