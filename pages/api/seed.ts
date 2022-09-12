// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { db, seedDatabase } from "../../database";
import { User } from "../../models";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === "production") {
    res.status(401).json({ message: "No tienes acceso a prod" });
  }

  await db.connect();
  await User.deleteMany();
  await User.insertMany(seedDatabase.initialData.users);

  await db.disconnect();

  res.status(200).json({ message: "Execution completed" });
}
