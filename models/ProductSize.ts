import mongoose, { Schema, model, Model } from "mongoose";
import { IProductSize } from "../interfaces";

const productSizeSchema = new Schema(
  {
    description: { type: String, required: true, default: "Create an amazing description" },
    images: [{ type: String }],
    inStock: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    sizes: [
      {
        stock: { type: Number, required: true, default: 0 },
        size: {
          type: String,
          required: true,
          enum: {
            values: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
            message: "enum validator failed for path `{PATH}` with value `{VALUE}`",
          },

          default: "XS",
        },
      },
    ],
    slug: { type: String, required: true, unique: true, default: "think-in-a-slug" },
    tags: [{ type: String }],
    title: { type: String, required: true, default: "Think in a title" },
    type: {
      type: String,
      enum: {
        values: ["shirts", "pants", "hoodies", "hats"],
        message: "enum validator failed for path `{PATH}` with value `{VALUE}`",
      },

      default: "shirts",
    },
    gender: {
      type: String,
      enum: {
        values: ["men", "women", "kid", "unisex"],
        message: "{VALUE} is not a valid gender",
      },

      default: "kid",
    },
  },
  {
    timestamps: true,
  }
);

const ProductSize: Model<IProductSize> = mongoose.models.ProductSize || model("ProductSize", productSizeSchema);

export default ProductSize;
