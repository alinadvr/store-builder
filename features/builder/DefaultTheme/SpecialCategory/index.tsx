import { DefaultProductBlock } from "@/features/builder/DefaultTheme/DefaultProductBlock";
import { Product } from "@/models/productModel";
import Link from "next/link";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export function SpecialCategory({
  category,
  products,
  shopLink,
}: {
  category: string;
  products: Product[];
  shopLink: string;
}) {
  function getCategoryProducts() {
    if (category === "All Products") return products;

    const categoryProducts: Product[] = [];
    products.forEach(
      (product) =>
        product.specialCategory === category && categoryProducts.push(product),
    );
    return categoryProducts;
  }

  const categoryProducts = getCategoryProducts();

  const { value: saved, setValue: setSaved } = useLocalStorage({
    key: "saved",
    defaultValue: [],
  });

  if (categoryProducts.length > 0)
    return (
      <section>
        <div className="mb-2 flex justify-between text-xl">
          <h2>{category.toUpperCase()}</h2>
          {category !== "All Products" && (
            <Link href="shop/best-sellers" className="underline">
              SEE ALL
            </Link>
          )}
        </div>
        <div className="grid grid-cols-5 gap-5">
          {categoryProducts.map((product) => (
            <DefaultProductBlock
              key={product._id}
              {...product}
              shopLink={shopLink}
              saved={saved?.indexOf(product._id) !== -1}
              updateSaved={() => setSaved(product._id)}
            />
          ))}
        </div>
      </section>
    );
}
