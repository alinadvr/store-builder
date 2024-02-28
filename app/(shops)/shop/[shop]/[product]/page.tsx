import { ProductPage } from "@/features/marketplace/ProductPage";
import { ShopModel } from "@/models/shopModel";
import { connectDB } from "@/utils/connectDB";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params }: { params: { shop: string; product: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  await connectDB();
  const res = await ShopModel.findOne({ link: params.shop }).select(
    "title -_id",
  );

  return {
    title:
      `${decodeURI(params.product)} - ${res?.title}` || "SHOPS.com - Error 404",
  };
}

export default function ShopProductPage({
  params,
}: {
  params: { shop: string; product: string };
}) {
  return <ProductPage shopLink={params.shop} productTitle={params.product} />;
}
