import { Shop, ShopDataType } from "@/models/shopModel";
import { connectDB } from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const response: ShopDataType[] = await Shop.find();

  return NextResponse.json(response);
}
