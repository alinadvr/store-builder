"use client";

import { ReactNode } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

import { Loading } from "@/components/layout/Loading";
import { Navbar } from "@/components/layout/Navbar";

export function ShopAdminLayout({ children }: { children: ReactNode }) {
  const session = useSession();
  const router = useRouter();
  const pathname = usePathname().split("/")[1];

  if (session.status === "loading")
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Loading />
      </div>
    );

  if (!session) router.push("/login");

  if (session.data?.user.link !== pathname)
    return (
      <div className="h-screen w-screen flex flex-col justify-center items-center gap-4">
        <p className="text-red-500 text-5xl">403 Forbidden</p>
        <span className="text-sm text-gray-400">
          You don&apos;t have permission to access this resource
        </span>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 pl-72">
      <Navbar />
      {children}
    </div>
  );
}
