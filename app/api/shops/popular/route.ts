import { ShopModel } from "@/models/shopModel";
import { connectDB } from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const response = await ShopModel.find({ popular: true });

  return NextResponse.json(response);
}
