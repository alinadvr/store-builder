import { Shop } from "@/models/shopModel";
import { model, models, Schema } from "mongoose";

export interface Product {
  _id: string;
  title: string;
  price: string;
  discountPrice?: string;
  article: string;
  categoryShop: string;
  categoryMP: string;
  specialCategory?: string;
  shop: Shop | string;
  amount: number;
  description?: string;
  options?: { [any: string]: string[] };
  images: string[];
  popular?: boolean;
}

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Schema.Types.Decimal128,
    required: true,
  },
  discountPrice: Schema.Types.Decimal128,
  article: {
    type: String,
    required: true,
  },
  categoryShop: {
    type: String,
    required: true,
  },
  categoryMP: {
    type: String,
    required: true,
  },
  specialCategory: String,
  amount: {
    type: Number,
    required: true,
  },
  description: String,
  options: Object,
  shop: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Shop",
  },
  images: {
    type: Array,
    required: true,
  },
  popular: Boolean,
});

export const ProductModel = models.Product || model("Product", productSchema);
