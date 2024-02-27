"use client";

import { Loading } from "@/components/layout/Loading";
import { ProductBlock } from "@/features/marketplace/ProductBlock";
import { AdditionalProducts } from "@/features/marketplace/ProductList/AdditionalProducts";
import { EmptyState } from "@/features/marketplace/ProductList/EmptyState";
import { ProductDataType } from "@/models/productModel";
import { useLocalStorage } from "@/utils/useLocalStorage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function WishLish() {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => axios("/api/products"),
  });

  const { value: saved, setValue: setSaved } = useLocalStorage({
    key: "saved",
    defaultValue: [],
  });

  return (
    <main className="mx-auto flex w-3/4 flex-col gap-6">
      <h1 className="text-3xl dark:text-violet-300">Wish List</h1>
      {saved ? (
        saved.length > 0 ? (
          <div className="grid grid-cols-5 gap-4">
            {products &&
              products.data.map(
                (product: ProductDataType) =>
                  saved?.indexOf(product._id) !== -1 && (
                    <ProductBlock
                      key={product._id}
                      {...product}
                      saved={true}
                      updateSaved={() => setSaved(product._id)}
                    />
                  )
              )}
          </div>
        ) : (
          <EmptyState type="wish list" />
        )
      ) : (
        <div className="mx-auto py-10">
          <Loading size="medium" />
        </div>
      )}
      {products && (
        <AdditionalProducts
          products={products.data}
          saved={saved}
          setSaved={setSaved}
        />
      )}
    </main>
  );
}
