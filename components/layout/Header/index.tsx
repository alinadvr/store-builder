"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

import { categories } from "@/components/layout/Header/categories";

import {
  ArrowLeftStartOnRectangleIcon,
  HeartIcon,
  ShoppingCartIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Squares2X2Icon } from "@heroicons/react/24/solid";
import { Search } from "@/components/layout/Header/Search";
import { ThemeToggle } from "@/components/layout/Header/ThemeToogle";
import { Loading } from "@/components/layout/Loading";

export function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const categoriesRef = useRef(null);
  const session = useSession();

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        isDropdownOpen &&
        categoriesRef.current &&
        !event.composedPath().includes(categoriesRef.current)
      )
        setIsDropdownOpen(false);
    }

    document.addEventListener("click", handleOutsideClick);
    return () => removeEventListener("click", handleOutsideClick);
  });

  return (
    <header className="mx-auto flex h-16 w-5/6 items-center justify-between gap-3 dark:text-violet-300">
      <h1>
        <Link href="/" className="font-bold">
          <span className="text-xl">SHOPS</span>.com
        </Link>
      </h1>
      <nav ref={categoriesRef}>
        <button
          type="button"
          className="flex items-center gap-1"
          onClick={() => setIsDropdownOpen((prevState) => !prevState)}
        >
          <Squares2X2Icon />
          <span>Categories</span>
        </button>
        {isDropdownOpen && (
          <div className="absolute left-0 top-16 z-40 flex h-[28rem] w-full flex-col flex-wrap gap-8 bg-white px-[10%] py-8 drop-shadow-sm dark:bg-violet-1000 dark:drop-shadow-light">
            {categories.map(({ title, subcategories }, index) => (
              <ul key={index}>
                <label className="mb-1 block font-bold">{title}</label>
                {subcategories.map((subcat) => (
                  <li key={subcat}>
                    <Link
                      href={`categories/${subcat}`}
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      {subcat}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        )}
      </nav>
      <Search />
      <ThemeToggle />
      <div className="flex items-center gap-3">
        <Link href="/wishlist">
          <HeartIcon />
        </Link>
        <Link href="/cart">
          <ShoppingCartIcon />
        </Link>
        {session.status === "authenticated" ? (
          <>
            <Link
              href={
                session.data?.user?.link
                  ? `/${session.data?.user?.link}/admin`
                  : "/account"
              }
            >
              <UserCircleIcon />
            </Link>
            <button type="button" onClick={() => signOut()}>
              <ArrowLeftStartOnRectangleIcon />
            </button>
          </>
        ) : session.status === "unauthenticated" ? (
          <UserCircleIcon onClick={() => signIn()} className="cursor-pointer" />
        ) : (
          <Loading />
        )}
      </div>
    </header>
  );
}
