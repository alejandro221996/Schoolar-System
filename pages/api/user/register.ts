import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { User } from "../../../models";
import bcrypt from "bcryptjs";
import { jwt, validations } from "../../../utils";

type Data =
  | { message: string }
  | {
      token: string;
      user: {
        name: string;
        email: string;
        role: string;
      };
    };
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req.method);
  console.log(req.body);
  switch (req.method) {
    case "POST":
      return registerUser(req, res);
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

const registerUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    email = "",
    password = "",
    name = "",
  } = req.body as { email: string; password: string; name: string };

  await db.connect();
  const user = await User.findOne({ email });
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" });
  }
  if (name.length < 3) {
    return res
      .status(400)
      .json({ message: "Name must be at least 3 characters" });
  }
  if (!validations.isValidEmail(email)) {
    return res.status(400).json({ message: "Email is not valid" });
  }

  if (user) {
    await db.disconnect();
    return res.status(409).json({ message: "User already exists" });
  }

  const newUser = new User({
    name,
    email: email.toLocaleLowerCase(),
    password: bcrypt.hashSync(password),
    role: "operator",
  });
  try {
    await newUser.save({ validateBeforeSave: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error creating user" });
  }
  const { _id, role } = newUser;
  const token = jwt.signToken(_id, email);

  return res.status(200).json({
    token,
    user: {
      name,
      email,
      role,
    },
  });
};
