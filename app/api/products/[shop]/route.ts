import mongoose from "mongoose";
import { NextResponse } from "next/server";

import { connectDB } from "@/utils/connectDB";
import { ShopModel } from "@/models/shopModel";
import { ProductModel } from "@/models/productModel";

export async function GET(request: Request) {
  const url = request.url;
  const segments = url.split("/");
  const shopLink = segments[segments.length - 1];

  await connectDB();

  try {
    const shopId = await ShopModel.findOne({ link: shopLink }).select("_id");

    const products = await ProductModel.find({
      shop: new mongoose.Types.ObjectId(shopId),
    });

    const response = products.map((product) => ({
      ...product._doc,
      price: Number(product.price).toFixed(2),
      discountPrice:
        product.discountPrice && Number(product.discountPrice).toFixed(2),
    }));

    return NextResponse.json(response);
  } catch (error) {
    console.log("[ERROR WHILE GETTING SHOP PRODUCTS]", error);
    return NextResponse.json(
      {
        message: "Failed to load products. Please try reloading the page",
      },
      { status: 500 },
    );
  }
}
