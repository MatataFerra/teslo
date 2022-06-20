import mongoose, { Schema, model, Model } from "mongoose";
import { IPickupPoint } from "../interfaces";

const pickupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    latitude: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const pickup: Model<IPickupPoint> = mongoose.models.Pickup || model("Pickup", pickupSchema);

export default pickup;
