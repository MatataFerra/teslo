import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { cookies } = req;

  console.log(cookies, "SERVER");

  res.status(200).json({ message: "Example" });
}
