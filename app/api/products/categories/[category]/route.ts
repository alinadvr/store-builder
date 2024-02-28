import mongoose from "mongoose";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { connectDB } from "@/utils/connectDB";
import { ShopModel } from "@/models/shopModel";
import { ProductModel } from "@/models/productModel";

export async function GET(request: Request) {
  await connectDB();
  const url = request.url;
  const segments = url.split("/");
  const category = decodeURI(segments[segments.length - 1])
    .split("%2C")
    .join(",");

  const shopLink = headers().get("shopLink");

  try {
    let products;
    if (shopLink) {
      const shopId = await ShopModel.findOne({ link: shopLink });
      products = await ProductModel.find({
        categoryShop: category,
        shop: new mongoose.Types.ObjectId(shopId),
      }).populate({
        path: "shop",
        select: "-email -password",
      });
    } else {
      products = await ProductModel.find({
        categoryMP: category,
      }).populate({
        path: "shop",
        select: "-email -password",
      });
    }

    const response = products.map((product) => ({
      ...product._doc,
      price: Number(product.price).toFixed(2),
      discountPrice:
        product.discountPrice && Number(product.discountPrice).toFixed(2),
    }));

    return NextResponse.json(response);
  } catch (error) {
    console.log("[ERROR WHILE GETTING CATEGORY PRODUCTS]", error);
    return NextResponse.json(
      {
        message:
          "Failed to load category products. Please try reloading the page",
      },
      { status: 500 },
    );
  }
}
