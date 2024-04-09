"use client";

import Link from "next/link";
import { signIn, useSession } from "next-auth/react";

import {
  HeartIcon,
  ShoppingCartIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

import { Loading } from "@/components/layout/Loading";

export function UserNav() {
  const session = useSession();

  return (
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
        </>
      ) : session.status === "unauthenticated" ? (
        <UserCircleIcon onClick={() => signIn()} className="cursor-pointer" />
      ) : (
        <Loading />
      )}
    </div>
  );
}
