import { Shop, ShopModel } from "@/models/shopModel";
import { connectDB } from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const response: Shop[] = await ShopModel.find();

  return NextResponse.json(response);
}
