import bcrypt from "bcryptjs";

interface SeedUser {
  name: string;
  email: string;
  password: string;
  role: string;
}

interface SeedData {
  users: SeedUser[];
}
export const initialData: SeedData = {
  users: [
    {
      name: "Pedro Perez",
      email: "pedro123@gmail.com",
      password: bcrypt.hashSync("123121"),
      role: "admin",
    },
    {
      name: "Paco Stanley",
      email: "paco12312@gmail.com",
      password: bcrypt.hashSync("333331"),
      role: "user",
    },
    {
      name: "Paco Felipez",
      email: "paco1231s12@gmail.com",
      password: bcrypt.hashSync("333331qqq"),
      role: "operator",
    },
  ],
};
