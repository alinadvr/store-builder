"use client";

import { NumberInput } from "@/components/fields/NumberInput";
import { ShopDataType } from "@/models/shopModel";
import classNames from "@/utils/classNames";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export interface CartProductDataType {
  _id: string;
  title: string;
  price: string;
  discountPrice?: string;
  shop: ShopDataType | string;
  amount: number;
  images: string[];
  options?: { [any: string]: string; product_amount: string };
}

interface CartItemsProps extends CartProductDataType {
  deleteItem: () => void;
  onAmountChange?: (value: number) => void;
}

export function CartItem({
  title,
  options,
  images,
  price,
  discountPrice,
  deleteItem,
  onAmountChange,
  shop,
}: CartItemsProps) {
  return (
    <section className="flex w-full items-center justify-between gap-5 rounded-2xl border border-slate-200 p-3 dark:border-violet-800">
      <div className="flex w-2/3 gap-2">
        <Link href={`/shop/${shop.link}/${title}`}>
          <Image
            src={images[0]}
            width={250}
            height={450}
            alt={title}
            className="aspect-square w-28 rounded-2xl object-cover"
          />
        </Link>
        <div>
          <Link href={`/shop/${shop.link}/${title}`}>
            <h3 className="dark:text-violet-300">{title}</h3>
          </Link>
          <ul className="pt-2 text-sm text-slate-400 dark:text-violet-500">
            {options &&
              Object.keys(options).map(
                (option) =>
                  option !== "product_amount" && (
                    <li key={option}>
                      {option}: {options[option]}
                    </li>
                  )
              )}
          </ul>
        </div>
      </div>
      <NumberInput
        defaultValue={1}
        onChange={onAmountChange}
        max={9999}
        min={1}
        step={1}
      />
      <div className="flex min-w-[10rem] items-center justify-center gap-2">
        <h2
          className={classNames(
            "text-lg font-bold",
            discountPrice ? "text-red-500" : "dark:text-violet-300"
          )}
        >
          {discountPrice ? discountPrice : price}€
        </h2>
        {discountPrice && (
          <span className="text-sm text-gray-300 line-through dark:text-violet-500">
            {price}€
          </span>
        )}
      </div>
      <button
        className="text-gray-300 dark:text-violet-700"
        type="button"
        onClick={deleteItem}
      >
        <XMarkIcon />
      </button>
    </section>
  );
}
