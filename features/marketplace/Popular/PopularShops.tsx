"use client";

import { ShopBlock } from "@/features/marketplace/ShopBlock";
import { ShopDataType } from "@/models/shopModel";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function PopularShops() {
  const { data, isLoading } = useQuery({
    queryKey: ["shops"],
    queryFn: () => axios("/api/shops"),
  });

  return (
    <div className="mx-auto my-10 grid min-h-[62vh] w-5/6 grid-cols-6 justify-items-center gap-4">
      {isLoading ? (
        <>
          {[0, 1, 2, 3, 4, 5].map((el, index) => (
            <div key={index} className="gradient h-56 w-full rounded-3xl"></div>
          ))}
        </>
      ) : data ? (
        data?.data.length > 0 ? (
          <>
            {data.data.map((shop: ShopDataType) => (
              <ShopBlock key={shop.link} {...shop} />
            ))}
          </>
        ) : (
          <p>No popular shops</p>
        )
      ) : (
        <p>Something went wrong. Please reload the page</p>
      )}
    </div>
  );
}
