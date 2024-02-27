import { DefaultCategories } from "@/features/builder/DefaultTheme/DefaultCategories";
import { DefaultLayout } from "@/features/builder/DefaultTheme/DefaultLayout";
import { Shop } from "@/models/shopModel";
import { connectDB } from "@/utils/connectDB";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params }: { params: { shop: string; category: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  await connectDB();
  const res = await Shop.findOne({ link: params.shop }).select("title -_id");

  return {
    title:
      `${decodeURI(params.category)} - ${res?.title}` ||
      "SHOPS.com - Error 404",
  };
}

export default function ShopCategoryPage({
  params,
}: {
  params: { shop: string; category: string };
}) {
  return (
    <DefaultLayout shopLink={params.shop} category={params.category}>
      <DefaultCategories link={params.shop} category={params.category} />
    </DefaultLayout>
  );
}
