"use client";

import { ThemeToggle } from "@/components/layout/Header/ThemeToogle";
import { adminNavigation } from "@/components/layout/Navbar/data";
import classNames from "@/utils/classNames";
import {
  ArrowRightCircleIcon,
  ArrowTopRightOnSquareIcon,
  EnvelopeIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";

export function Navbar() {
  const [shopLink, _, page, subpage] = useSelectedLayoutSegments();

  return (
    <header className="fixed bottom-0 left-0 top-0 flex w-64 flex-col justify-between border-r border-slate-200 bg-white p-3 dark:border-violet-700 dark:bg-violet-950">
      <nav>
        <h1>
          <Link href="/" className="font-bold dark:text-white">
            <span className="text-xl">SHOPS</span>.com
          </Link>
        </h1>
        <ul className="mt-3">
          {adminNavigation.map(({ title, icon, subnav }) => (
            <li key={title}>
              <Link
                href={
                  title !== "home"
                    ? `/${shopLink}/admin/${title}`
                    : `/${shopLink}/admin`
                }
                className={classNames(
                  "mt-1 flex items-center gap-2 rounded-lg px-2 py-1",
                  page === title || (page === undefined && title === "home")
                    ? "bg-violet-100 text-violet-700 dark:bg-violet-700 dark:text-violet-50"
                    : "text-slate-700 dark:text-violet-300"
                )}
              >
                {icon}
                {title[0].toUpperCase() + title.slice(1)}
              </Link>
              {subnav && (
                <ul className="ml-7">
                  {subnav.map((nav) => (
                    <li key={nav.title}>
                      <Link
                        href={`/${shopLink}/admin/${title}/${nav.title}`}
                        className={classNames(
                          "mt-1 flex items-center gap-2 rounded-lg px-2 py-1",
                          subpage === nav.title
                            ? "text-violet-700"
                            : "text-slate-700 dark:text-violet-300"
                        )}
                      >
                        {nav.icon}
                        {nav.title[0].toUpperCase() + nav.title.slice(1)}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          <li key="My Store">
            <Link
              href={`/shop/${shopLink}`}
              className="mt-1 flex items-center gap-2 rounded-lg px-2 py-1"
            >
              <ArrowTopRightOnSquareIcon />
              My Store
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex flex-col gap-3 text-slate-700 dark:text-violet-300">
        <ThemeToggle style="black" />
        <Link href="/help" className="flex items-center gap-2">
          <InformationCircleIcon />
          Help
        </Link>
        <Link
          href="mailto:shops.com.info@gmail.com"
          className="flex items-center gap-2"
        >
          <EnvelopeIcon />
          Send Feedback
        </Link>
        <button
          className="flex items-center gap-2"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <ArrowRightCircleIcon />
          Log Out
        </button>
      </div>
    </header>
  );
}
