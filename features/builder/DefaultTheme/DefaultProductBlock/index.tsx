"use client";

import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";

import classNames from "@/utils/classNames";
import { useCart } from "@/utils/useCart";
import { Product } from "@/models/productModel";

import { LikeButton } from "@/components/buttons/LikeButton";

interface DefaultProductBlockProps extends Product {
  shopLink: string;
  saved: boolean;
  updateSaved: () => void;
}

export function DefaultProductBlock({
  _id,
  title,
  price,
  discountPrice,
  images,
  options,
  shopLink,
  saved,
  updateSaved,
}: DefaultProductBlockProps) {
  const { changeCartItems } = useCart();
  return (
    <section className="flex flex-col gap-1">
      <Link href={`/shop/${shopLink}/${title}`}>
        <Image
          src={images[0]}
          alt={title}
          width={300}
          height={200}
          quality={100}
          className="w-full object-cover"
        />
      </Link>
      <div className="flex h-full flex-col justify-between gap-1">
        <Link href={`/shops/${shopLink}/${title}`}>
          <h3>{title}</h3>
        </Link>
        <div className="flex justify-between">
          <div className="h-full">
            <p
              className={classNames(
                "font-bold",
                discountPrice ? "text-red-500" : "",
              )}
            >
              {discountPrice ? discountPrice : price}€
            </p>
            {discountPrice && <p className="text-sm line-through">{price}€</p>}
          </div>
          <div className="flex items-center gap-2">
            <LikeButton saved={saved} updateSaved={updateSaved} />
            <button
              type="button"
              className="bg-black px-4 py-2.5 font-medium text-white"
              onClick={() => {
                let selectedOptions: { [any: string]: string } = {};
                if (options) {
                  Object.keys(options).map(
                    (option) => (selectedOptions[option] = options[option][0]),
                  );
                }
                changeCartItems(_id, {
                  ...selectedOptions,
                  product_amount: "1",
                });
                toast.success("Product added to cart");
              }}
            >
              To cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
