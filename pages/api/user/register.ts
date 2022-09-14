import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { User } from "../../../models";
import bcrypt from "bcryptjs";
import { jwt, validations } from "../../../utils";
import { ROLES } from "../../../database/constants";

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
    role = "",
  } = req.body as {
    email: string;
    password: string;
    name: string;
    role: string;
  };
  console.log(req.body);
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
  if (!ROLES.validRoles.includes(role)) {
    await db.disconnect();
    return res.status(400).json({ message: "Role is not valid" });
  }
  const newUser = new User({
    name,
    email: email.toLocaleLowerCase(),
    password: bcrypt.hashSync(password),
    role: role,
  });
  try {
    await newUser.save({ validateBeforeSave: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error creating user" });
  }
  const { _id } = newUser;
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
