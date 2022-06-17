// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res
    .status(200)
    .json({
      name: "This is an example response. If you see this message, its means you know NextJS. Congrats! see you :)",
    });
}
