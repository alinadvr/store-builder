import { Shop } from "@/models/shopModel";
import { connectDB } from "@/utils/connectDB";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = request.url;
  const segments = url.split("/");
  const shopLink = segments[segments.length - 1];

  await connectDB();

  const response = await Shop.findOne({ link: shopLink }).select(
    "-email -password"
  );

  return NextResponse.json(response);
}

export async function PUT(request: Request) {
  const url = request.url;
  const segments = url.split("/");
  const shopLink = segments[segments.length - 1];

  const valueToUpdate = headers().get("value");
  const { fileUrl } = await request.json();

  await connectDB();

  const response = await Shop.updateOne(
    { link: shopLink },
    { [valueToUpdate as string]: fileUrl }
  );

  return NextResponse.json(response);
}
