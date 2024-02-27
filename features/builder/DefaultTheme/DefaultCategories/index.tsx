"use client";

import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { Loading } from "@/components/layout/Loading";
import { DefaultProductBlock } from "@/features/builder/DefaultTheme/DefaultProductBlock";
import { ProductDataType } from "@/models/productModel";
import { useLocalStorage } from "@/utils/useLocalStorage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function DefaultCategories({
  link,
  category,
}: {
  link: string;
  category: string;
}) {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products", link, "categories", category],
    queryFn: () =>
      axios.get(`/api/products/categories/${category}`, {
        headers: { shopLink: link },
      }),
  });

  const { value: saved, setValue: setSaved } = useLocalStorage({
    key: "saved",
    defaultValue: [],
  });

  if (isLoading)
    return (
      <div className="flex min-h-[38vh] items-center justify-center">
        <Loading size="medium" />
      </div>
    );

  if (products) {
    if (products.data.length > 0)
      return (
        <div className="mx-auto grid min-h-[38vh] grid-cols-6 gap-4">
          {products.data.map((product: ProductDataType) => (
            <DefaultProductBlock
              key={product._id}
              {...product}
              saved={saved?.indexOf(product._id) !== -1}
              updateSaved={() => setSaved(product._id)}
              shopLink={link}
            />
          ))}
        </div>
      );
    return (
      <p className="flex min-h-[38vh] items-center justify-center text-xl text-slate-400">
        Category is empty
      </p>
    );
  }

  return (
    <div className="flex w-screen items-center justify-center pt-96">
      <div className="flex flex-col items-center gap-6">
        <p className="text-2xl">
          Sorry, we can&#39;t find this category in the shop
        </p>
        <PrimaryButton
          buttonType="link"
          text="Back"
          to={`/shop/${link}`}
          className="h-14 w-36"
        />
      </div>
    </div>
  );
}
