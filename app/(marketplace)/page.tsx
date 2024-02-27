"use client";

import { ProductBlock } from "@/features/marketplace/ProductBlock";
import { ShopBlock } from "@/features/marketplace/ShopBlock";
import { ProductDataType } from "@/models/productModel";
import { ShopDataType } from "@/models/shopModel";
import { useLocalStorage } from "@/utils/useLocalStorage";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";

export default function Home() {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products", "popular"],
    queryFn: () => axios("/api/products/popular"),
  });

  const { data: popularShops } = useQuery({
    queryKey: ["shops", "popular"],
    queryFn: () => axios.get("/api/shops/popular"),
  });

  const { value: saved, setValue: setSaved } = useLocalStorage({
    key: "saved",
    defaultValue: [],
  });

  return (
    <main className="flex flex-col gap-8">
      <section className="relative mx-auto flex w-3/4 pb-5">
        <h2 className="slider__title absolute -left-10 z-10 h-full text-center text-2xl font-bold dark:text-violet-300">
          POPULAR SHOPS
        </h2>
        <div className="grid w-full auto-rows-[0] grid-cols-6 grid-rows-1 gap-4 overflow-hidden">
          {popularShops
            ? popularShops.data.map((shop: ShopDataType) => (
                <ShopBlock key={shop.title} {...shop} />
              ))
            : [0, 1, 2, 3, 4, 5].map((el, index) => (
                <div
                  key={index}
                  className="gradient h-56 w-full rounded-3xl"
                ></div>
              ))}
        </div>
        <Link
          href="/popular-shops"
          className="absolute bottom-0 left-1/2 flex w-20 -translate-x-1/2 items-center gap-1 text-sm text-slate-400"
        >
          See all
          <ArrowRightIcon className="w-4" />
        </Link>
      </section>
      <div className="banner flex h-96 flex-col justify-center gap-8 bg-violet-700 pl-[25%] text-white">
        <h1 className="text-5xl font-bold">Want to get your own shop?</h1>
        <div className="flex items-center gap-6">
          <Link href="/registration#details" className="text-sm underline">
            Learn more
          </Link>
          <Link
            href="/registration"
            className="rounded-xl border border-white p-4 text-lg"
          >
            Get started now!
          </Link>
        </div>
      </div>
      <section className="relative mx-auto flex w-3/4 pb-4">
        <h2 className="slider__title absolute -left-10 z-10 h-full text-center text-2xl font-bold dark:text-violet-300">
          POPULAR PRODUCTS
        </h2>
        <div className="grid w-full auto-rows-[0] grid-cols-6 grid-rows-1 gap-4 overflow-hidden">
          {products
            ? products.data.map((product: ProductDataType) => (
                <ProductBlock
                  key={product._id}
                  {...product}
                  saved={saved?.indexOf(product._id) !== -1}
                  updateSaved={() => setSaved(product._id)}
                />
              ))
            : [0, 1, 2, 3, 4, 5].map((el, index) => (
                <div
                  key={index}
                  className="gradient h-80 w-full rounded-3xl"
                ></div>
              ))}
        </div>
        <Link
          href="/popular-products"
          className="absolute bottom-0 left-1/2 flex w-20 -translate-x-1/2 items-center gap-1 text-sm text-slate-400"
        >
          See all
          <ArrowRightIcon className="w-4" />
        </Link>
      </section>
    </main>
  );
}
