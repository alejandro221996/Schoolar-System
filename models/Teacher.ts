import mongoose, { Schema, model, Model } from "mongoose";
import { ITeacher } from "../interfaces";

const TeacherSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Teacher: Model<ITeacher> =
  mongoose.models.Teacher || model("Teacher", TeacherSchema);
export default Teacher;
