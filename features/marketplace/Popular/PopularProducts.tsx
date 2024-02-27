"use client";

import { ProductBlock } from "@/features/marketplace/ProductBlock";
import { ProductDataType } from "@/models/productModel";
import { useLocalStorage } from "@/utils/useLocalStorage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function PopularProducts() {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => axios("/api/products"),
  });

  const { value: saved, setValue: setSaved } = useLocalStorage({
    key: "saved",
    defaultValue: [],
  });

  return (
    <div className="mx-auto my-10 grid min-h-[65vh] w-5/6 grid-cols-6 gap-4">
      {isLoading ? (
        <>
          {[0, 1, 2, 3, 4, 5].map((el, index) => (
            <div key={index} className="gradient h-80 w-full rounded-3xl"></div>
          ))}
        </>
      ) : data ? (
        data?.data.length > 0 ? (
          <>
            {data.data.map((product: ProductDataType) => (
              <ProductBlock
                key={product._id}
                {...product}
                saved={saved?.indexOf(product._id) !== -1}
                updateSaved={() => setSaved(product._id)}
              />
            ))}
          </>
        ) : (
          <p>No popular products</p>
        )
      ) : (
        <p>Something went wrong. Please reload the page</p>
      )}
    </div>
  );
}
