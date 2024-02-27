"use client";

import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { Loading } from "@/components/layout/Loading";
import { DefaultTheme } from "@/features/builder/DefaultTheme";
import { DefaultLayout } from "@/features/builder/DefaultTheme/DefaultLayout";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function ShopMainPage({ shopLink }: { shopLink: string }) {
  const { data: shop, isLoading } = useQuery({
    queryKey: ["shops", shopLink],
    queryFn: () => axios.get(`/api/shops/${shopLink}`),
  });

  if (isLoading)
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="flex flex-col items-center gap-10">
          <h1 className="text-4xl  text-violet-700">
            We are looking for shop you are looking for
          </h1>
          <Loading size="big" />
        </div>
      </div>
    );

  if (shop?.data)
    return (
      <DefaultLayout shopLink={shopLink}>
        <DefaultTheme link={shopLink} categories={shop.data.categories} banner={shop.data.banner} />
      </DefaultLayout>
    );

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <p className="text-2xl">
          Sorry, we can&#39;t find this shop on our platform
        </p>
        <PrimaryButton
          buttonType="link"
          text="Home Page"
          to="/"
          className="h-14 w-36"
        />
      </div>
    </div>
  );
}
