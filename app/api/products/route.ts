import { Product } from "@/models/productModel";
import { Shop } from "@/models/shopModel";
import { connectDB } from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const products = await Product.find().populate({
    path: "shop",
    select: "-email -password",
  });

  const response = products.map((product) => ({
    ...product._doc,
    price: Number(product.price).toFixed(2),
    discountPrice:
      product.discountPrice && Number(product.discountPrice).toFixed(2),
  }));

  return NextResponse.json(response);
}

export async function POST(request: Request) {
  const body = await request.json();

  await connectDB();

  const shop = await Shop.findOne({ link: body.shop }).select("_id");

  const newProduct = await Product.create({
    ...body,
    amount: body.amount | 0,
    shop: shop._id,
  });

  return NextResponse.json(newProduct);
}
