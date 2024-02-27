import { defaultCategories } from "@/features/builder/DefaultTheme/DefaultHeader/data";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export function DefaultHeader({
  logo,
  shopLink,
  categories,
}: {
  logo?: string;
  shopLink: string;
  categories: string[];
}) {
  return (
    <header className="flex items-center justify-between border-b border-neutral-200 bg-white py-4">
      <Link href={`/shop/${shopLink}`}>
        {logo ? (
          <Image
            src={logo}
            alt="Shop logo"
            width={50}
            height={50}
            className="h-12 w-full object-contain"
          />
        ) : (
          <h1 className="text-2xl font-bold leading-4">
            <span className="text-base">My</span>
            <br />
            Store
          </h1>
        )}
      </Link>
      <nav className="flex gap-5">
        {categories && categories.length > 0
          ? categories.map((category) => (
              <Link
                key={category}
                href={`/shop/${shopLink}/categories/${category}`}
                className="hover:underline"
              >
                {category}
              </Link>
            ))
          : defaultCategories.map((category) => (
              <span key={category} className="hover:underline">
                {category}
              </span>
            ))}
      </nav>
      <label className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="border border-neutral-200 py-1 pl-8 pr-2"
        />
        <MagnifyingGlassIcon className="absolute left-1 top-1/2 -translate-y-1/2 text-neutral-200" />
      </label>
    </header>
  );
}
