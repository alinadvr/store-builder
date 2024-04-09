"use client";

import { Loading } from "@/components/layout/Loading";
import { AdditionalProducts } from "@/features/marketplace/ProductList/AdditionalProducts";
import {
  CartItem,
  CartProductDataType,
} from "@/features/marketplace/ProductList/CartItem";
import { EmptyState } from "@/features/marketplace/ProductList/EmptyState";
import { TotalOrder } from "@/features/marketplace/ProductList/TotalOrder";
import { getCartProducts } from "@/utils/getCartProducts";
import { useCart } from "@/hooks/useCart";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function Cart() {
  const session = useSession();
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => axios("/api/products"),
  });

  const { value: saved, setValue: setSaved } = useLocalStorage({
    key: "saved",
    defaultValue: [],
  });

  const { cartItems, removeItem, clearCart, changeCartItems } = useCart();

  let cartProducts;

  if (products?.data && cartItems) {
    cartProducts = getCartProducts(products.data, cartItems);
  }

  return (
    <main className="mx-auto flex w-3/4 flex-col gap-6">
      <h1 className="text-3xl dark:text-violet-300">Cart</h1>
      {isLoading && (
        <div className="flex min-h-[58vh] items-center justify-center">
          <Loading size="medium" />
        </div>
      )}
      {!isLoading &&
        (cartProducts && cartProducts.length > 0 ? (
          <div className="flex gap-10">
            <div className="relative flex w-2/3 flex-col items-end gap-3">
              <button
                className="absolute -top-7 text-gray-300 dark:text-violet-700"
                type="button"
                onClick={clearCart}
              >
                Clear
              </button>
              {cartProducts.map((product: CartProductDataType) => (
                <CartItem
                  key={product._id}
                  {...product}
                  deleteItem={() => removeItem(product._id)}
                  onAmountChange={(value) =>
                    changeCartItems(product._id, {
                      ...product.options,
                      product_amount: value.toString(),
                    })
                  }
                />
              ))}
            </div>
            <TotalOrder
              productsAmount={cartProducts.reduce(
                (accumulator: number, currentValue: CartProductDataType) =>
                  accumulator +
                  Number(currentValue.options?.product_amount || 0),
                0,
              )}
              sale={cartProducts.reduce(
                (accumulator: number, currentValue: CartProductDataType) =>
                  accumulator +
                  (Number(currentValue.discountPrice || 0)
                    ? (Number(currentValue.price) -
                        Number(currentValue.discountPrice || 0)) *
                      Number(currentValue.options?.product_amount || 0)
                    : 0),
                0,
              )}
              totalPrice={cartProducts.reduce(
                (accumulator: number, currentValue: CartProductDataType) =>
                  accumulator +
                  (Number(currentValue.discountPrice || 0)
                    ? Number(currentValue.discountPrice) *
                      Number(currentValue.options?.product_amount || 0)
                    : Number(currentValue.price) *
                      Number(currentValue.options?.product_amount || 0)),
                0,
              )}
              status={session.status}
              cartProducts={cartProducts}
            />
          </div>
        ) : (
          <EmptyState type="cart" />
        ))}
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
