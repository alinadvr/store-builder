import { NextResponse } from "next/server";

import { connectDB } from "@/utils/connectDB";
import { ProductModel } from "@/models/productModel";

export async function GET() {
  await connectDB();

  try {
    const products = await ProductModel.find({ popular: true }).populate({
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
    console.log("[ERROR WHILE GETTING POPULAR PRODUCTS]", error);
    return NextResponse.json(
      {
        message:
          "Failed to load popular products. Please try reloading the page",
      },
      { status: 500 },
    );
  }
}
