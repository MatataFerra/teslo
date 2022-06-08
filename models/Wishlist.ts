import mongoose, { Schema, model, Model } from "mongoose";
import { IWishlist } from "../interfaces";

const wishlistSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const wishlist: Model<IWishlist> = mongoose.models.Wishlist || model("Wishlist", wishlistSchema);

export default wishlist;
