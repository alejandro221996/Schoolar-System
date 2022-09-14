import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { IUser } from "../../../interfaces";
import { Course, Student, Teacher, User } from "../../../models";

type Data =
  | { message: string }
  | {
      users: IUser[];
    };
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getInfoDashboard(req, res);
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

const getInfoDashboard = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  await db.connect();
  //get just the ids of the users
  const users = await User.find({}, { name: 1, email: 1, role: 1 });
  console.log(users);
  return res.status(200).json({
    users,
  });
};
