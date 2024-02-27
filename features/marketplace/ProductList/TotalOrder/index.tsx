"use client";

import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { SecondaryButton } from "@/components/buttons/SecondaryButton";
import { TextInput } from "@/components/fields/TextInput";
import { CheckoutModal } from "@/features/marketplace/CheckoutModal";
import { CartProductDataType } from "@/features/marketplace/ProductList/CartItem";
import { useState } from "react";
import { toast } from "react-toastify";

export function TotalOrder({
  productsAmount,
  sale,
  totalPrice,
  status,
  cartProducts,
}: {
  productsAmount: number;
  sale: number;
  totalPrice: number;
  status: string;
  cartProducts: CartProductDataType[];
}) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  function createOrder() {
    if (cartProducts.length < 0) return toast.error("Your cart is empty");

    cartProducts.forEach(
      (product) =>
        product.options?.product_amount === undefined ||
        (Number(product.options?.product_amount) < 1 &&
          toast.error(`${product.title} kept in less than one`))
    );

    setIsCheckoutOpen(true);
  }

  return (
    <>
      <div className="flex w-1/3 flex-col gap-3">
        <form className="flex gap-6 rounded-xl bg-violet-100 py-3 pl-3 pr-6 dark:bg-violet-950">
          <TextInput
            type="text"
            placeHolder={
              status === "unauthenticated"
                ? "Log in to apply voucher"
                : "Enter a promocode"
            }
          />
          <button
            type="submit"
            className="text-violet-600 disabled:opacity-50 dark:text-violet-400"
            disabled={status === "unauthenticated"}
          >
            Apply
          </button>
        </form>
        <div className="rounded-xl bg-violet-100 p-6 dark:bg-violet-950">
          <h2 className="text-2xl font-medium text-violet-800 dark:text-violet-300">
            Your order
          </h2>
          <ul className="mt-3 flex flex-col gap-2">
            <li className="text-lg font-medium text-violet-800">
              <span className="inline-block w-[7rem] text-base font-normal text-violet-600">
                Products:
              </span>
              {productsAmount}
            </li>
            <li className="text-lg font-medium text-violet-800">
              <span className="inline-block w-[7rem] text-base font-normal text-violet-600">
                Sale:
              </span>
              {sale.toFixed(2)}€
            </li>
            <li className="text-lg font-medium text-violet-800">
              <span className="inline-block w-[7rem] text-base font-normal text-violet-600">
                Total price:
              </span>
              {sale !== 0 ? (
                <div className="inline-flex items-center gap-3">
                  <span className="text-xl text-red-500">
                    {totalPrice.toFixed(2)}€
                  </span>
                  <span className="text-base text-violet-300 line-through">
                    {(totalPrice + sale).toFixed(2)}€
                  </span>
                </div>
              ) : (
                <>{totalPrice.toFixed(2)}€</>
              )}
            </li>
          </ul>
        </div>
        <PrimaryButton
          buttonType="button"
          text="Checkout now"
          type="button"
          className="h-11"
          onClick={createOrder}
        />
        <SecondaryButton
          buttonType="link"
          text="Continue Shopping"
          to="/"
          className="h-11"
        />
      </div>
      <CheckoutModal
        totalPrice={totalPrice}
        sale={sale}
        isOpen={isCheckoutOpen}
        close={() => setIsCheckoutOpen(false)}
        cartProducts={cartProducts}
      />
    </>
  );
}
