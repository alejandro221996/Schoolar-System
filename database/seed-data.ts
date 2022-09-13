import bcrypt from "bcryptjs";

interface SeedUser {
  name: string;
  email: string;
  password: string;
  role: string;
}
interface SeedStudents {
  name: string;
  email: string;
  password: string;
}
interface SeedTeachers {
  name: string;
  email: string;
  password: string;
}
interface SeedCourses {
  name: string;
  description: string;
  price: number;
}

interface SeedData {
  users: SeedUser[];
  students: SeedStudents[];
  teachers: SeedTeachers[];
  courses: SeedCourses[];
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
  students: [
    {
      name: "Fernando Perez",
      email: "fer.123@gmail.com",
      password: bcrypt.hashSync("123121"),
    },
    {
      name: "Fernanda Perezzsas",
      email: "fer.1235@gmail.com",
      password: bcrypt.hashSync("12312123"),
    },
    {
      name: "Raul Perez",
      email: "raul.123@gmail.com",
      password: bcrypt.hashSync("12312s1"),
    },
  ],
  teachers: [
    {
      name: "Ferran Perez",
      email: "fesrar.123@gmail.com",
      password: bcrypt.hashSync("123121"),
    },
    {
      name: "German Plata",
      email: "ger.1235@gmail.com",
      password: bcrypt.hashSync("12312123"),
    },
    {
      name: "Raul Torres",
      email: "raul.212123@gmail.com",
      password: bcrypt.hashSync("12312s1"),
    },
  ],
  courses: [
    {
      name: "Curso de React",
      description: "Curso de React",
      price: 100,
    },
    {
      name: "Curso de Angular",
      description: "Curso de Angular",
      price: 100,
    },
    {
      name: "Curso de Vue",
      description: "Curso de Vue",
      price: 100,
    },
  ],
};
