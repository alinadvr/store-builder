"use client";

import axios from "axios";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { useLocalStorage } from "@/utils/useLocalStorage";
import { Product } from "@/models/productModel";
import { Shop } from "@/models/shopModel";

import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { ShopBlock } from "@/features/marketplace/ShopBlock";
import { ProductBlock } from "@/features/marketplace/ProductBlock";
import { Slider } from "@/components/layout/Slider";
import { PopularBlockSkeleton } from "@/features/marketplace/PopularBlockSkeleton";

export default function Home() {
  const products = useQuery({
    queryKey: ["products", "popular"],
    queryFn: async (): Promise<Product[]> => {
      const { data } = await axios("/api/products/popular");
      return data;
    },
  });

  const shops = useQuery({
    queryKey: ["shops", "popular"],
    queryFn: async (): Promise<Shop[]> => axios.get("/api/shops/popular"),
  });

  const { value: saved, setValue: setSaved } = useLocalStorage({
    key: "saved",
    defaultValue: [],
  });

  return (
    <main className="flex flex-col gap-8">
      <section className="mx-auto w-5/6">
        <div className="flex gap-2 h-64">
          <h2 className="slider__title text-2xl text-center font-bold dark:text-violet-300">
            POPULAR SHOPS
          </h2>
          {shops.isLoading ? (
            <PopularBlockSkeleton />
          ) : shops.isError ? (
            <div className="mx-auto flex flex-col justify-center items-center">
              <span className="text-red-500 font-medium text-xl">
                Failed to load popular shops
              </span>
              <span className="text-gray-400 text-sm">
                Please try reloading the page
              </span>
            </div>
          ) : (
            <Slider elementsPerRow={5}>
              {shops.data.map((shop) => (
                <ShopBlock key={shop.title} {...shop} />
              ))}
            </Slider>
          )}
        </div>
        <Link
          href="/popular-shops"
          className="flex items-center gap-1 text-sm text-slate-500 w-fit mx-auto mt-2"
        >
          See all
          <ArrowUpRightIcon className="w-3" />
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
      <section className="mx-auto w-5/6">
        <div className="flex gap-2 h-64">
          <h2 className="slider__title text-2xl text-center font-bold dark:text-violet-300">
            POPULAR PRODUCTS
          </h2>
          {products.isLoading ? (
            <PopularBlockSkeleton />
          ) : products.isError ? (
            <div className="mx-auto flex flex-col justify-center items-center">
              <span className="text-red-500 font-medium text-xl">
                Failed to load popular products
              </span>
              <span className="text-gray-400 text-sm">
                Please try reloading the page
              </span>
            </div>
          ) : (
            <Slider elementsPerRow={5}>
              {products.data.map((product) => (
                <ProductBlock
                  key={product._id}
                  {...product}
                  saved={saved?.indexOf(product._id) !== -1}
                  updateSaved={() => setSaved(product._id)}
                />
              ))}
            </Slider>
          )}
        </div>
        <Link
          href="/popular-products"
          className="flex items-center gap-1 text-sm text-slate-500 w-fit mx-auto mt-2"
        >
          See all
          <ArrowUpRightIcon className="w-3" />
        </Link>
      </section>
    </main>
  );
}
