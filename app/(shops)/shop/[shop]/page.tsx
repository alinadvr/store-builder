import { ShopMainPage } from "@/features/marketplace/ShopMainPage";
import { Shop } from "@/models/shopModel";
import { connectDB } from "@/utils/connectDB";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params }: { params: { shop: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  await connectDB();
  const res = await Shop.findOne({ link: params.shop }).select("title -_id");

  return {
    title: res?.title || "SHOPS.com - Error 404",
  };
}

export default function ShopPage({ params }: { params: { shop: string } }) {
  return <ShopMainPage shopLink={params.shop} />;
}
