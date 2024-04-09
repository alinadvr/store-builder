import Link from "next/link";

import { PopularShops } from "@/features/marketplace/home/PopularShops";
import { PopularProducts } from "@/features/marketplace/home/PopularProducts";

export default function Home() {
  return (
    <main className="flex flex-col gap-8">
      <PopularShops />
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
      <PopularProducts />
    </main>
  );
}
