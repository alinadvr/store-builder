import { ShopModel, Shop } from "@/models/shopModel";
import { connectDB } from "@/utils/connectDB";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { DefaultMessages } from "@/types/manifest";

export async function POST(request: Request) {
  const { title, email, password } = await request.json();

  if (!title || !email || !password)
    return NextResponse.json(
      {
        message:
          "Shop name, email or password missed. Please fill out the field and try again",
      },
      { status: 400 },
    );

  await connectDB();

  try {
    const shop: Shop | null = await ShopModel.findOne({
      $or: [{ title }, { email }],
    });

    if (shop)
      return NextResponse.json(
        {
          message:
            "The shop with this name or email already exists. Please try another one",
        },
        { status: 400 },
      );
  } catch (error) {
    console.log(`[ERROR WHILE GETTING SHOP WHILE CREATING NEW SHOP]`, error);
    return NextResponse.json({ message: DefaultMessages.ServerError });
  }

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  const link = title.toLowerCase().split(" ").join("-");

  try {
    await ShopModel.create({
      title,
      link,
      email,
      password: passwordHash,
    });

    return NextResponse.json({ title }, { status: 200 });
  } catch (error) {
    console.log("[ERROR WHILE CREATING NEW SHOP]", error);
    return NextResponse.json(
      { message: DefaultMessages.ServerError },
      { status: 500 },
    );
  }
}
