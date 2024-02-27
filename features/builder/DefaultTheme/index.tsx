"use client";

import { Loading } from "@/components/layout/Loading";
import { defaultProducts } from "@/features/builder/DefaultTheme/DefaultProductBlock/data";
import { SpecialCategory } from "@/features/builder/DefaultTheme/SpecialCategory";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";

interface DefaultThemeProps {
  link: string;
  categories: string[];
  banner: string;
  specialCategories?: string[];
}

export function DefaultTheme({
  link,
  categories,
  banner,
  specialCategories,
}: DefaultThemeProps) {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products", link],
    queryFn: () => axios.get(`/api/products/${link}`),
  });

  return (
    <>
      <Image
        src={banner || "/defaultBanner.png"}
        alt="Banner"
        width={1000}
        height={400}
        quality={100}
        priority
        className="h-[500px] w-full object-cover"
      />
      {products ? (
        products.data.length > 0 ? (
          specialCategories &&
          specialCategories.length > 0 &&
          specialCategories[0] !== "" ? (
            specialCategories.map((category: string) => (
              <SpecialCategory
                key={category}
                category={category}
                products={products.data}
                shopLink={link}
              />
            ))
          ) : (
            <SpecialCategory
              key="All Products"
              category="All Products"
              shopLink={link}
              products={products.data}
            />
          )
        ) : (
          <SpecialCategory
            key="All Products"
            category="All Products"
            shopLink={link}
            products={defaultProducts}
          />
        )
      ) : !isLoading ? (
        <p>Something went wring</p>
      ) : (
        <Loading />
      )}
    </>
  );
}
