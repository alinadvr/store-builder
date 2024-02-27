import { Product } from "@/models/productModel";
import { connectDB } from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const products = await Product.find({ popular: true }).populate({
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
