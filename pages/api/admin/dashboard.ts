import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Course, User } from "../../../models";

type Data =
  | { message: string }
  | {
      users: number;
      students: number;
      teachers: number;
      courses: number;
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
  //get users filter by role equal to admin
  const users = await User.find({ role: "admin" }).countDocuments();
  const students = await User.find({ role: "user" }).countDocuments();
  const teachers = await User.find({ role: "operator" }).countDocuments();
  const courses = await Course.countDocuments(); //const courses = 50;

  return res.status(200).json({
    users,
    students,
    teachers,
    courses,
  });
};