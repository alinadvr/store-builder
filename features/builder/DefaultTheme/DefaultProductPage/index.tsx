import { ProductImages } from "@/features/builder/DefaultTheme/DefaultProductPage/ProductImages";
import { ProductOptions } from "@/features/builder/DefaultTheme/DefaultProductPage/ProductOptions";
import { ProductDataType } from "@/models/productModel";

interface DefaultProductPageProps {
  product: ProductDataType;
}

export function DefaultProductPage({ product }: DefaultProductPageProps) {
  return (
    <div className="mx-auto flex w-3/4 gap-10">
      <ProductImages images={product.images} alt={product.title} />
      <div className="w-1/2">
        <section className="flex flex-col gap-2 border-b border-dashed border-slate-200 pb-4">
          <h2 className="text-lg">{product.title}</h2>
          <span className="text-sm">Article: {product.article}</span>
          {product.discountPrice ? (
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-red-500">
                {product.discountPrice}€
              </span>
              <span className="text-sm line-through">{product.price}€</span>
            </div>
          ) : (
            <span className="text-lg font-bold">{product.price}€</span>
          )}
        </section>
        <ProductOptions options={product.options} productId={product._id} />
        <div className="mt-3">
          <h2 className="text-xl">Description</h2>
          {product.description ? (
            <p>{product.description}</p>
          ) : (
            <p className="text-gray-300">No description for the product</p>
          )}
        </div>
      </div>
    </div>
  );
}
