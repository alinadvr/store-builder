"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Product } from "@/models/productModel";

import { Slider } from "@/components/layout/Slider";
import { PopularLayout } from "@/features/marketplace/home/PopularLayout";
import { ProductBlock } from "@/features/marketplace/ProductBlock";

export function PopularProducts() {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", "popular"],
    queryFn: async (): Promise<Product[]> => {
      const { data } = await axios("/api/products/popular");
      return data;
    },
  });

  const { value: saved, setValue: setSaved } = useLocalStorage({
    key: "saved",
    defaultValue: [],
  });

  return (
    <PopularLayout
      seeMoreLink="/popular-products"
      isLoading={isLoading}
      isError={isError}
      isEmpty={products?.length === 0}
    >
      {products && products.length > 0 && (
        <Slider elementsPerRow={5}>
          {products.map((product) => (
            <ProductBlock
              key={product._id}
              {...product}
              saved={saved?.indexOf(product._id) !== -1}
              updateSaved={() => setSaved(product._id)}
            />
          ))}
        </Slider>
      )}
    </PopularLayout>
  );
}
