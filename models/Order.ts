import mongoose, { Schema, model, Model } from "mongoose";
import { IOrder } from "../interfaces";

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    orderItems: [
      {
        _id: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        title: { type: String, required: true },
        size: {
          stock: { type: Number, required: true },
          size: {
            type: String,
            required: true,
            enum: {
              values: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
              message: "enum validator failed for path `{PATH}` with value `{VALUE}`",
            },
          },
        },
        quantity: { type: Number, required: true },
        slug: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],

    shippingAddress: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      address: { type: String, required: true },
      address2: { type: String },
      zip: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
      phone: { type: String, required: true },
    },

    paymentResult: { type: String },

    numberOfItems: { type: Number, required: true },
    total: { type: Number, required: true },
    subTotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: String },

    status: {
      type: String,
      required: true,
      enum: {
        values: ["pending", "processing", "shipped", "delivered", "cancelled"],
        message: "enum validator failed for path `{PATH}` with value `{VALUE}`",
      },

      default: "pending",
    },

    transactionId: { type: String },
  },
  {
    timestamps: true,
  }
);

const Order: Model<IOrder> = mongoose.models.Order || model("Order", orderSchema);

export default Order;
