import mongoose, { Schema, model, Model } from "mongoose";
import { IProduct } from "../interfaces";

const productSchema = new Schema(
  {
    description: { type: String, required: true, default: "Create an amazing description" },
    images: [{ type: String }],
    inStock: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    sizes: [
      {
        type: String,
        enum: {
          values: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
          message: "enum validator failed for path `{PATH}` with value `{VALUE}`",
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

productSchema.index({ title: "text", tags: "text" });
productSchema.statics = {
  searchPartial: function (q, callback) {
    return this.find(
      {
        $or: [{ title: new RegExp(q, "gi") }, { tags: new RegExp(q, "gi") }],
      },
      callback
    );
  },
};

const Product: Model<IProduct> = mongoose.models.Product || model("Product", productSchema);

export default Product;
