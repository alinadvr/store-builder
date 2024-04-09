"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { Shop } from "@/models/shopModel";

import { Slider } from "@/components/layout/Slider";
import { ShopBlock } from "@/features/marketplace/ShopBlock";
import { PopularLayout } from "@/features/marketplace/home/PopularLayout";

export function PopularShops() {
  const {
    data: shops,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["shops", "popular"],
    queryFn: async (): Promise<Shop[]> => {
      const { data } = await axios("/api/shops/popular");
      return data;
    },
  });

  return (
    <PopularLayout
      seeMoreLink="/popular-shops"
      isLoading={isLoading}
      isError={isError}
      isEmpty={shops?.length === 0}
    >
      {shops && shops.length > 0 && (
        <Slider elementsPerRow={5}>
          {shops.map((shop) => (
            <ShopBlock key={shop.title} {...shop} />
          ))}
        </Slider>
      )}
    </PopularLayout>
  );
}
