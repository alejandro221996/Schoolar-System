import mongoose, { Schema, model, Model } from "mongoose";
import { IStudent } from "../interfaces";

const StudentSchema = new Schema(
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
const Student: Model<IStudent> =
  mongoose.models.Student || model("Student", StudentSchema);
export default Student;
