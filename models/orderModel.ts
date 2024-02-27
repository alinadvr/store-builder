import { model, models, Schema } from "mongoose";

export interface OrderDataType {
  _id: string;
  shop: {
    type: Schema.Types.ObjectId;
    required: true;
  };
  products: { [any: string]: { [any: string]: string } };
  customer: {
    name: string;
    surname: string;
    email: string;
    address: string;
    phoneNumber: string;
    city: string;
    zip: string;
    state: string;
    country: string;
  };
  date: Date;
  status: string;
  voucher: string;
  paymentMethod: string;
}

const orderSchema = new Schema({
  shop: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  products: {
    type: Object,
    required: true,
  },
  customer: {
    type: Schema.Types.Mixed,
    // type: Schema.Types.ObjectId || {
    //   name: { type: String, required: true },
    //   surname: { type: String, required: true },
    //   email: { type: String, required: true },
    //   address: { type: String, required: true },
    //   phoneNumber: { type: String, required: true },
    //   city: { type: String, required: true },
    //   zip: { type: String, required: true },
    //   state: { type: String, required: true },
    //   country: { type: String, required: true },
    // },
    required: true,
  },
  date: {
    type: Date,
    default: () => Date.now(),
  },
  status: {
    type: String,
    default: "In Progress",
  },
  voucher: Schema.Types.ObjectId,
  paymentMethod: { type: String, required: true },
});

export const Order = models.Order || model("Order", orderSchema);
