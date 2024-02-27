import { Schema, model, models } from "mongoose";

export interface UserDataType {
  name: string;
  surname: string;
  email: string;
  password: string;
  vouchers: string[];
  ordersTotalPrice: number;
  address?: string;
  phoneNumber?: string;
  city?: string;
  zip?: string;
  state?: string;
  country?: string;
}

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  vouchers: {
    type: Array,
    default: [],
  },
  ordersTotalPrice: {
    type: Schema.Types.Decimal128,
    default: 0,
  },
  address: String,
  phoneNumber: String,
  city: String,
  zip: String,
  state: String,
  country: String,
});

export const User = models.User || model("User", userSchema);
