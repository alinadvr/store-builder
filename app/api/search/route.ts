import { NextResponse } from "next/server";

import { connectDB } from "@/utils/connectDB";
import { ProductModel } from "@/models/productModel";
import { ShopModel } from "@/models/shopModel";

export async function GET(request: Request) {
  await connectDB();

  try {
    const shops = await ShopModel.find();

    const products = await ProductModel.find().populate({
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
  } catch (error) {
    console.log("[ERROR WHILE SEARCHING FOR PRODUCTS AND SHOPS]", error);
    return NextResponse.json(
      {
        message: "Failed to load products. Please try reloading the page",
      },
      { status: 500 },
    );
  }
}
