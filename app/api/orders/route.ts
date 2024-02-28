import { CartProductDataType } from "@/features/marketplace/ProductList/CartItem";
import { Order } from "@/models/orderModel";
import { Shop } from "@/models/shopModel";
import { User } from "@/models/userModel";
import { connectDB } from "@/utils/connectDB";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const {
    name,
    surname,
    email,
    address,
    phoneNumber,
    city,
    zip,
    state,
    country,
    paymentMethod,
    cartProducts,
  } = await request.json();

  await connectDB();

  const user = await User.findOne({ email }).select("_id");

  let customer:
    | mongoose.Types.ObjectId
    | {
        name: string;
        surname: string;
        email: string;
        address: string;
        phoneNumber: string;
        city: string;
        zip: string;
        state: string;
        country: string;
      };
  if (user) customer = new mongoose.Types.ObjectId(user);
  else
    customer = {
      name,
      surname,
      email,
      address,
      phoneNumber,
      city,
      zip,
      state,
      country,
    };

  const allShops: string[] = cartProducts.map(
    ({ shop }: CartProductDataType) => (shop as Shop)._id,
  );

  const shops = allShops.filter(
    (value, index) => allShops.indexOf(value) === index,
  );

  // { shopId: { productId: { option?: value, product_amount: value }, productId: { option?: value, product_amount: value } }
  const shopOrder: {
    [any: string]: { [any: string]: { [any: string]: string } };
  } = {};
  shops.forEach((shop) => (shopOrder[shop] = {}));

  cartProducts.map(
    (product: CartProductDataType) =>
      (shopOrder[(product.shop as Shop)._id][product._id] = product.options || {
        product_amount: "1",
      }),
  );

  let orders = [];
  Object.keys(shopOrder).map(async (shopId) => {
    const order = await Order.create({
      shop: new mongoose.Types.ObjectId(shopId),
      products: shopOrder[shopId],
      customer,
      status: "In Progress",
      paymentMethod,
    });
    orders.push(order);
  });

  return NextResponse.json({ success: true });
}
