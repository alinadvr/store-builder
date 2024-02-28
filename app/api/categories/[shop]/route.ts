import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { connectDB } from "@/utils/connectDB";
import { ShopModel } from "@/models/shopModel";

export async function GET(request: Request) {
  const url = request.url;
  const segments = url.split("/");
  const shopLink = segments[segments.length - 1];

  await connectDB();

  try {
    const type = headers().get("type") as string;

    const shop = await ShopModel.findOne({ link: shopLink }).select(
      `${type} -_id`,
    );

    const response =
      shop[type] && shop[type].length > 0
        ? shop[type]
        : ["EMPTY_SPECIAL_CATEGORIES"];

    return NextResponse.json(response);
  } catch (error) {
    console.log("[ERROR WHILE GETTING SHOP CATEGORIES]", error);
    return NextResponse.json(
      {
        message: "Failed to load categories. Please try reloading the page",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const { title } = await request.json();
  const url = request.url;
  const segments = url.split("/");
  const shopLink = segments[segments.length - 1];

  const type = headers().get("type") as string;

  await connectDB();

  try {
    const response = await ShopModel.findOneAndUpdate(
      { link: shopLink },
      {
        $push: { [type]: title },
      },
    );

    return NextResponse.json([...response[type], title]);
  } catch (error) {
    console.log("[ERROR WHILE CREATING SHOP CATEGORY]", error);
    return NextResponse.json(
      {
        message: "Failed to create category. Please try again",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  const url = request.url;
  const segments = url.split("/");
  const shopLink = segments[segments.length - 1];

  const type = headers().get("type") as string;
  const title = headers().get("title") as string;

  await connectDB();

  try {
    const response = await ShopModel.findOneAndUpdate(
      { link: shopLink },
      {
        $pull: { [type]: title },
      },
    );

    const categories = [
      ...response[type].filter((category: string) => category !== title),
    ];

    return NextResponse.json(categories);
  } catch (error) {
    console.log("[ERROR WHILE DELETING SHOP CATEGORY]", error);
    return NextResponse.json(
      {
        message: "Failed to delete category. Please try again",
      },
      { status: 500 },
    );
  }
}
