import { NextResponse } from "next/server";

import { connectDB } from "@/utils/connectDB";
import { ProductModel } from "@/models/productModel";
import { ShopModel } from "@/models/shopModel";

export async function GET() {
  await connectDB();

  try {
    const products = await ProductModel.find().populate({
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
  } catch (error) {
    console.log("[ERROR WHILE GETTING PRODUCTS]", error);
    return NextResponse.json(
      {
        message: "Failed to load products. Please try reloading the page",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const body = await request.json();

  await connectDB();

  const shop = await ShopModel.findOne({ link: body.shop }).select("_id");

  const newProduct = await ProductModel.create({
    ...body,
    amount: body.amount | 0,
    shop: shop._id,
  });

  return NextResponse.json(newProduct);
}
