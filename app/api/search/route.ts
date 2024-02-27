import { Product } from "@/models/productModel";
import { Shop } from "@/models/shopModel";
import { connectDB } from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await connectDB();

  const shops = await Shop.find();

  const products = await Product.find().populate({
    path: "shop",
    select: "link",
  });

  const productsFilteredPrice = products.map((product) => ({
    ...product._doc,
    price: Number(product.price).toFixed(2),
    discountPrice:
      product.discountPrice && Number(product.discountPrice).toFixed(2),
  }));

  const response = [...shops, ...productsFilteredPrice];

  return NextResponse.json(response);
}
