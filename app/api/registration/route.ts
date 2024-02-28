import { ShopModel, Shop } from "@/models/shopModel";
import { connectDB } from "@/utils/connectDB";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { title, email, password } = await request.json();

  if (!title || !email || !password)
    return NextResponse.json({
      status: 400,
      message:
        "Shop name, email or password missed. Please fill out the field and try again",
    });

  await connectDB();

  const shopTitle: Shop | undefined = await ShopModel.findOne({
    title,
  }).catch(() => undefined);

  if (shopTitle)
    return NextResponse.json({
      status: 400,
      message: "The shop with this name already exists. Please try another one",
    });

  const shop: Shop | undefined = await ShopModel.findOne({ email }).catch(
    () => undefined,
  );

  if (shop)
    return NextResponse.json({
      status: 400,
      message: "The shop with this email already exists",
    });

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  const link = title.toLowerCase().split(" ").join("-");

  await ShopModel.create({
    title,
    link,
    email,
    password: passwordHash,
  });

  return NextResponse.json({ title });
}
