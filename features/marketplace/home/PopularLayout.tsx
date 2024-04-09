import Link from "next/link";
import { ReactNode } from "react";

import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { PopularBlockSkeleton } from "@/features/marketplace/PopularBlockSkeleton";

export function PopularLayout({
  seeMoreLink,
  isLoading,
  isError,
  isEmpty,
  children,
}: {
  seeMoreLink: string;
  isLoading?: boolean;
  isError?: boolean;
  isEmpty?: boolean;
  children?: ReactNode;
}) {
  return (
    <section className="mx-auto w-5/6">
      <div className="flex gap-2 h-64">
        <h2 className="slider__title text-2xl text-center font-bold dark:text-violet-300">
          POPULAR SHOPS
        </h2>
        {isLoading ? (
          <PopularBlockSkeleton />
        ) : isError ? (
          <div className="mx-auto flex flex-col justify-center items-center">
            <span className="text-red-500 font-medium text-xl">
              Failed to load data
            </span>
            <span className="text-gray-400 text-sm">
              Please try reloading the page
            </span>
          </div>
        ) : isEmpty ? (
          <p className="m-auto text-gray-400">No data found</p>
        ) : (
          children
        )}
      </div>
      <Link
        href={seeMoreLink}
        className="flex items-center gap-1 text-sm text-slate-500 w-fit mx-auto mt-2"
      >
        See all
        <ArrowUpRightIcon className="w-3" />
      </Link>
    </section>
  );
}
