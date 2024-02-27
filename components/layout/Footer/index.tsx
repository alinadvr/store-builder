import { TextInput } from "@/components/fields/TextInput";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

const footerNavigation = [
  {
    title: "Popular Categories",
    subcategories: [
      "Sweatshirts",
      "Backpacks",
      "Tops",
      "Sport",
      "For her",
      "Make up",
      "Perfumes",
    ],
  },
  {
    title: "About us",
    subcategories: ["Create a shop", "How do we work?", "Contacts"],
  },
];

export function Footer() {
  return (
    <footer className="relative mx-auto flex w-3/4 items-center justify-between border-t border-slate-200 py-7 dark:border-violet-800 dark:text-violet-300">
      <nav className="flex gap-14">
        {footerNavigation.map(({ title, subcategories }) => (
          <ul key={title}>
            <span className="mb-1.5 block font-bold">{title}</span>
            {subcategories.map((subcat) => (
              <li key={subcat}>{subcat}</li>
            ))}
          </ul>
        ))}
        <ul key="findUsOn" className="flex h-16 w-24 flex-wrap">
          <span className="font-bold">Find us on</span>
          <li>
            <Link href="https://www.instagram.com/" target="_blank">
              <Image
                src="/instagram_logo.svg"
                alt="Shops.com Instagram"
                width={30}
                height={30}
              />
            </Link>
          </li>
          <li>
            <Link href="https://telegram.org/" target="_blank">
              <Image
                src="/telegram_logo.svg"
                alt="Shops.com Telegram"
                width={30}
                height={30}
              />
            </Link>
          </li>
          <li>
            <Link href="https://www.facebook.com/" target="_blank">
              <Image
                src="/facebook_logo.svg"
                alt="Shops.com Facebook"
                width={30}
                height={30}
              />
            </Link>
          </li>
        </ul>
      </nav>
      <Link href="/">
        <h1 className="text-3xl font-bold">
          <span className="text-4xl">SHOPS</span>.com
        </h1>
        <span className="text-sm text-slate-400 dark:text-violet-600">
          Ready to get your own shop?
        </span>
      </Link>
      <form className="relative w-96">
        <label htmlFor="email" className="mb-2 block font-bold">
          Sign up for our news
        </label>
        <TextInput
          type="email"
          placeHolder="Email"
          id="email"
          name="email"
          required={true}
        />
        <button type="submit">
          <ArrowRightIcon className="absolute bottom-1.5 right-3 text-slate-300 dark:text-violet-600" />
        </button>
      </form>
      <span className="absolute bottom-0 right-0 text-xs text-slate-400 dark:text-violet-800">
        Copyright © 2023 SHOPS.com
      </span>
    </footer>
  );
}
