import { LikeButton } from "@/components/buttons/LikeButton";
import { Product } from "@/models/productModel";
import Image from "next/image";
import Link from "next/link";

interface ProductBlockProps extends Product {
  saved: boolean;
  updateSaved: () => void;
}

export function ProductBlock({
  title,
  images,
  price,
  discountPrice,
  saved,
  updateSaved,
  shop,
}: ProductBlockProps) {
  function reformatTitle() {
    if (title.length > 30) return title.slice(0, 30) + "..";
    return title;
  }

  return (
    <div className="flex flex-col gap-2">
      {images && (
        <Link href={`/shop/${shop.link}/${title}`}>
          <Image
            src={images[0]}
            alt={title}
            width={250}
            height={450}
            className="h-full w-full rounded-3xl bg-violet-400 object-cover"
          />
        </Link>
      )}
      <Link href={`/shop/${shop.link}/${title}`}>
        <h6 className="overflow-hidden text-sm text-slate-500 dark:text-violet-500">
          {reformatTitle()}
        </h6>
      </Link>
      <div className="flex justify-between">
        {discountPrice ? (
          <div className="flex items-center gap-2">
            <span className="font-bold text-red-500">{discountPrice}€</span>
            <span className="text-xs text-slate-400 line-through dark:text-violet-700">
              {price}€
            </span>
          </div>
        ) : (
          <span className="font-bold dark:text-violet-300">{price}€</span>
        )}
        <LikeButton saved={saved} updateSaved={updateSaved} />
      </div>
    </div>
  );
}
