"use client";

import { ProductBlock } from "@/features/marketplace/ProductBlock";
import { ProductDataType } from "@/models/productModel";

export function AdditionalProducts({
  products,
  saved,
  setSaved,
}: {
  products: ProductDataType[];
  saved?: string | string[];
  setSaved: (productId: string) => void;
}) {
  let count = 0;

  return (
    <>
      <span className="-mb-4 dark:text-violet-300">Take a look</span>
      <div className="grid grid-cols-5 gap-4">
        {products.map((product) => {
          if (count < 5 && saved?.indexOf(product._id) === -1) {
            count++;
            return (
              <ProductBlock
                key={product._id}
                {...product}
                saved={saved?.indexOf(product._id) !== -1}
                updateSaved={() => setSaved && setSaved(product._id)}
              />
            );
          }
        })}
      </div>
    </>
  );
}
