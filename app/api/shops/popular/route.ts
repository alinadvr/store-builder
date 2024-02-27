import { Shop } from "@/models/shopModel";
import { connectDB } from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const response = await Shop.find({ popular: true });

  return NextResponse.json(response);
}
