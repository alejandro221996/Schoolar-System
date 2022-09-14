import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Course } from "../../../models";

type Data =
  | { message: string }
  | {
      id: string;
      name: string;
      description: string;
      price: string;
    };
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return registerCourse(req, res);
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

const registerCourse = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    name = "",
    description = "",
    price = "",
  } = req.body as {
    name: string;
    description: string;
    price: string;
  };
  console.log(req.body);
  await db.connect();
  const course = await Course.findOne({ name });
  if (course) {
    return res.status(400).json({ message: "Course already exists" });
  }
  if (name.length < 3) {
    return res
      .status(400)
      .json({ message: "Name must be at least 3 characters" });
  }
  const newCourse = new Course({
    name,
    description,
    price,
  });
  try {
    await newCourse.save({ validateBeforeSave: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error creating course" });
  }
  const { _id } = newCourse;
  return res.status(200).json({
    id: _id,
    name,
    description,
    price,
  });
};
