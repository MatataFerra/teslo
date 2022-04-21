import mongoose, { Schema, model, Model } from "mongoose";
import { IUser } from "../interfaces";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: {
        values: ["client", "admin"],
        message: "enum validator failed for path `{PATH}` with value `{VALUE}`",
      },
      default: "client",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const user: Model<IUser> = mongoose.models.User || model("User", userSchema);

export default user;
