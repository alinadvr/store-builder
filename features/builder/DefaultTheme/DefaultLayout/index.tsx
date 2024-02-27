"use client";

import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { ThemeToggle } from "@/components/layout/Header/ThemeToogle";
import { UserNav } from "@/components/layout/Header/UserNav";
import { Loading } from "@/components/layout/Loading";
import { DefaultFooter } from "@/features/builder/DefaultTheme/DefaultFooter";
import { DefaultHeader } from "@/features/builder/DefaultTheme/DefaultHeader";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import React from "react";

interface DefaultLayoutProps {
  shopLink: string;
  category?: string;
  children: JSX.Element | JSX.Element[];
}

export function DefaultLayout({
  shopLink,
  category,
  children,
}: DefaultLayoutProps) {
  const { data: shop, isLoading } = useQuery({
    queryKey: ["shops", shopLink],
    queryFn: () => axios.get(`/api/shops/${shopLink}`),
  });

  const renderChildren = () => {
    if (shop)
      return React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          ...shop.data,
          category,
        });
      });
  };

  if (isLoading)
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="flex flex-col items-center gap-10">
          <h1 className="text-4xl  text-violet-700">
            We are looking for shop you are looking for
          </h1>
          <Loading size="big" />
        </div>
      </div>
    );

  if (shop?.data)
    return (
      <>
        <header className="flex items-center justify-between border-b border-slate-200 px-[8.2%] py-1">
          <h1>
            <Link href="/" className="font-bold">
              <span className="text-xl">SHOPS</span>.com
            </Link>
          </h1>
          <div className="flex w-1/4 justify-between gap-3">
            <ThemeToggle style="black" />
            <UserNav />
          </div>
        </header>
        <div className="mx-auto flex w-5/6 flex-col gap-4">
          <DefaultHeader
            shopLink={shopLink}
            categories={shop.data.categories}
            logo={shop.data.logo}
          />
          {renderChildren()}
          <DefaultFooter
            shopLink={shopLink}
            logo={shop.data.logo}
            categories={shop.data.categories}
          />
        </div>
      </>
    );

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <p className="text-2xl">
          Sorry, we can&#39;t find this shop on our platform
        </p>
        <PrimaryButton
          buttonType="link"
          text="Home Page"
          to="/"
          className="h-14 w-36"
        />
      </div>
    </div>
  );
}
