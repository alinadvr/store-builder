import { Shop } from "@/models/shopModel";
import { connectDB } from "@/utils/connectDB";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = request.url;
  const segments = url.split("/");
  const shopLink = segments[segments.length - 1];

  await connectDB();

  const type = headers().get("type") as string;

  const shop = await Shop.findOne({ link: shopLink }).select(`${type} -_id`);

  const response =
    shop[type] && shop[type].length > 0
      ? shop[type]
      : ["EMPTY_SPECIAL_CATEGORIES"];

  return NextResponse.json(response);
}

export async function POST(request: Request) {
  const { title } = await request.json();
  const url = request.url;
  const segments = url.split("/");
  const shopLink = segments[segments.length - 1];

  const type = headers().get("type") as string;

  await connectDB();

  const response = await Shop.findOneAndUpdate(
    { link: shopLink },
    {
      $push: { [type]: title },
    }
  );

  return NextResponse.json([...response[type], title]);
}

export async function DELETE(request: Request) {
  const url = request.url;
  const segments = url.split("/");
  const shopLink = segments[segments.length - 1];

  const type = headers().get("type") as string;
  const title = headers().get("title") as string;

  await connectDB();

  const response = await Shop.findOneAndUpdate(
    { link: shopLink },
    {
      $pull: { [type]: title },
    }
  );

  const categories = [
    ...response[type].filter((category: string) => category !== title),
  ];

  return NextResponse.json(categories);
}
