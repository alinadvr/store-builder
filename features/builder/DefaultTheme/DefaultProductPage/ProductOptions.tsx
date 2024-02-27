"use client";

import { LikeButton } from "@/components/buttons/LikeButton";
import classNames from "@/utils/classNames";
import { useCart } from "@/utils/useCart";
import { useLocalStorage } from "@/utils/useLocalStorage";
import { useState } from "react";
import { toast } from "react-toastify";

export function ProductOptions({
  productId,
  options,
}: {
  productId: string;
  options?: { [any: string]: string[] };
}) {
  console.log(options);
  function getDefaultOptions(options: { [any: string]: string[] }) {
    const defaultOptions: { [any: string]: string } = {};
    Object.keys(options).forEach(
      (option) => (defaultOptions[option] = options[option][0])
    );
    return defaultOptions;
  }

  const [selectedOptions, setSelectedOptions] = useState(
    options ? getDefaultOptions(options) : {}
  );

  const { cartItems, changeCartItems } = useCart();

  const { value: saved, setValue: setSaved } = useLocalStorage({
    key: "saved",
    defaultValue: [],
  });

  function changeSelectedOptions(option: string, value: string) {
    const oldValues = { ...selectedOptions };
    delete oldValues[option];
    setSelectedOptions({ ...oldValues, [option]: value });
  }

  return (
    <>
      {options && (
        <section className="flex flex-col gap-2 border-b border-dashed border-slate-200 py-4">
          {Object.keys(options).map((option) => (
            <div key={option} className="flex flex-col gap-2">
              <h4 className="flex gap-3">
                {option}:
                <span className="font-bold">{selectedOptions[option]}</span>
              </h4>
              <ul className="flex flex-wrap gap-3">
                {options &&
                  options[option].map((value) => (
                    <li
                      key={value}
                      className={classNames(
                        "cursor-pointer rounded-full px-5 py-1",
                        selectedOptions[option] === value
                          ? "border-[3px] border-black"
                          : "border border-slate-200"
                      )}
                      onClick={() => changeSelectedOptions(option, value)}
                    >
                      {value}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </section>
      )}
      <section className="flex items-center gap-2 border-b border-dashed border-slate-200 py-4">
        <button
          type="button"
          className="w-52 bg-black py-4 text-xl font-bold text-white"
          onClick={() => {
            changeCartItems(productId, {
              ...selectedOptions,
              product_amount: "1",
            });
            toast.success("Product added to cart");
          }}
        >
          Add to cart
        </button>
        <LikeButton
          saved={saved?.indexOf(productId) !== -1}
          updateSaved={() => setSaved(productId)}
          size="big"
        />
      </section>
    </>
  );
}
