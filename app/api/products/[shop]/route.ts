import { Product } from "@/models/productModel";
import { Shop } from "@/models/shopModel";
import { connectDB } from "@/utils/connectDB";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = request.url;
  const segments = url.split("/");
  const shopLink = segments[segments.length - 1];

  await connectDB();

  const shopId = await Shop.findOne({ link: shopLink }).select("_id");

  const products = await Product.find({
    shop: new mongoose.Types.ObjectId(shopId),
  });

  const response = products.map((product) => ({
    ...product._doc,
    price: Number(product.price).toFixed(2),
    discountPrice:
      product.discountPrice && Number(product.discountPrice).toFixed(2),
  }));

  return NextResponse.json(response);
}
