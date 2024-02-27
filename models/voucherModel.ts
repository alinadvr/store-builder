import { Schema, Types, model, models } from "mongoose";

const voucherModel = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  discount: {
    type: Types.Decimal128,
    required: true,
  },
});

export const Voucher = models.Voucher || model("Voucher", voucherModel);
