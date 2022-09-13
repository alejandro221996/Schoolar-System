import mongoose, { Schema, model, Model } from "mongoose";
import { ICourse } from "../interfaces";

const CourseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Course: Model<ICourse> =
  mongoose.models.Course || model("Course", CourseSchema);
export default Course;
