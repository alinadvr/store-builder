import { Product } from "@/models/productModel";
import { connectDB } from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = request.url;
  const segments = url.split("/");
  const shopLink = segments[segments.length - 2];
  const productTitle = decodeURI(segments[segments.length - 1])
    .split("%2C")
    .join(",");

  await connectDB();

  const products = await Product.find({ title: productTitle }).populate({
    path: "shop",
  });

  const filteredProducts = products.filter(
    (product) => product.shop.link === shopLink
  );

  const response = filteredProducts.map((product) => ({
    ...product._doc,
    price: Number(product.price).toFixed(2),
    discountPrice:
      product.discountPrice && Number(product.discountPrice).toFixed(2),
  }));

  return NextResponse.json(response[0]);
}

export async function DELETE(request: Request) {
  const url = request.url;
  const segments = url.split("/");
  const title = decodeURI(segments[segments.length - 1])
    .split("%2C")
    .join(",");

  await connectDB();

  const response = await Product.findOneAndDelete({ title });

  return NextResponse.json(response);
}
