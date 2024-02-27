import { ShopDataType } from "@/models/shopModel";
import Image from "next/image";
import Link from "next/link";

export function ShopBlock({ title, image, link }: ShopDataType) {
  return (
    <Link
      href={`/shop/${link}`}
      className="relative flex h-56 w-56 shrink-0 items-center justify-center rounded-3xl drop-shadow-md"
    >
      <Image
        src={image || ""}
        alt={title}
        width={250}
        height={250}
        className="absolute top-0 -z-20 h-full w-full rounded-3xl object-cover"
      />
      <div className="absolute top-0 -z-10 h-full w-full rounded-3xl bg-smoke"></div>
      <h3 className="m-5 text-center text-4xl font-bold text-white">{title}</h3>
    </Link>
  );
}
