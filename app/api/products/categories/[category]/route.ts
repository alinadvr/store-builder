import { Product } from "@/models/productModel";
import { Shop } from "@/models/shopModel";
import { connectDB } from "@/utils/connectDB";
import mongoose from "mongoose";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await connectDB();
  const url = request.url;
  const segments = url.split("/");
  const category = decodeURI(segments[segments.length - 1])
    .split("%2C")
    .join(",");

  const shopLink = headers().get("shopLink");

  let products;
  if (shopLink) {
    const shopId = await Shop.findOne({ link: shopLink });
    products = await Product.find({
      categoryShop: category,
      shop: new mongoose.Types.ObjectId(shopId),
    }).populate({
      path: "shop",
      select: "-email -password",
    });
  } else {
    products = await Product.find({
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
}
