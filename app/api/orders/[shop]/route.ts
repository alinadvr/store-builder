import { Order } from "@/models/orderModel";
import { Shop } from "@/models/shopModel";
import { connectDB } from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = request.url;
  const segments = url.split("/");
  const shopLink = decodeURI(segments[segments.length - 1])
    .split("%2C")
    .join(",");

  await connectDB();

  const shopId = await Shop.findOne({ link: shopLink });

  const response = await Order.find({ shop: shopId });

  console.log(response);

  return NextResponse.json(response);
}
