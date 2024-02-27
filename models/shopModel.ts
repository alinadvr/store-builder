import { Schema, model, models } from "mongoose";

export interface ShopDataType {
  _id: string;
  title: string;
  link: string;
  email: string;
  password: string;
  categories: string[];
  theme?: {};
  image?: string;
  specialCategories?: string[];
  banner?: string;
  logo?: string;
  popular?: boolean;
}

const shopSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  link: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  theme: Object,
  categories: Array,
  specialCategories: Array,
  image: String,
  banner: String,
  logo: String,
  popular: Boolean,
});

export const Shop = models.Shop || model("Shop", shopSchema);
