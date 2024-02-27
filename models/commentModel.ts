import { model, models, Schema, Types } from "mongoose";

const orderSchema = new Schema({
  customer: {
    type: Types.ObjectId,
    required: true,
  },
  product: {
    type: Types.ObjectId,
    required: true,
  },
  text: String,
  options: Object,
  rating: Number,
  deliveryTime: Number,
  likes: {
    type: Number,
    default: 0,
  },
});

export const Order = models.Order || model("Order", orderSchema);
