import { NextResponse } from "next/server";

import { connectDB } from "@/utils/connectDB";
import { ProductModel } from "@/models/productModel";

export async function GET(request: Request) {
  const url = request.url;
  const segments = url.split("/");
  const shopLink = segments[segments.length - 2];
  const productTitle = decodeURI(segments[segments.length - 1])
    .split("%2C")
    .join(",");

  await connectDB();

  try {
    const products = await ProductModel.find({ title: productTitle }).populate({
      path: "shop",
    });

    const filteredProducts = products.filter(
      (product) => product.shop.link === shopLink,
    );

    const response = filteredProducts.map((product) => ({
      ...product._doc,
      price: Number(product.price).toFixed(2),
      discountPrice:
        product.discountPrice && Number(product.discountPrice).toFixed(2),
    }));

    return NextResponse.json(response[0]);
  } catch (error) {
    console.log("[ERROR WHILE GETTING SHOP PRODUCT]", error);
    return NextResponse.json(
      {
        message: "Failed to load product. Please try reloading the page",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  const url = request.url;
  const segments = url.split("/");
  const title = decodeURI(segments[segments.length - 1])
    .split("%2C")
    .join(",");

  await connectDB();

  try {
    await ProductModel.findOneAndDelete({ title });

    return NextResponse.json({
      message: `Product ${title} was deleted successfully`,
    });
  } catch (error) {
    console.log("[ERROR WHILE DELETING SHOP PRODUCT]", error);
    return NextResponse.json(
      {
        message: "Failed to load products. Please try reloading the page",
      },
      { status: 500 },
    );
  }
}
