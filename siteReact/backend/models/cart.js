import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    products: [
      {
        product: { type: String, required: true },
        price: { type: Number, required: true },
        amount: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

export const Cart = mongoose.model("Cart", cartSchema);
