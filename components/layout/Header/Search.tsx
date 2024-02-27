"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export function Search() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [isResultOpen, setIsResultOpen] = useState(false);
  const searchBlockRef = useRef(null);

  const { data: data, isLoading } = useQuery({
    queryKey: ["search"],
    queryFn: () => axios.get(`/api/search`),
  });

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
    if (data && event.target.value !== "")
      setResult(
        data.data.filter((data: { title: string }) =>
          data.title
            .toLowerCase()
            .slice(0, event.target.value.length)
            .includes(event.target.value.toLowerCase())
        )
      );
    else setResult([]);
  }

  useEffect(() => {
    function handleOnClick(e: MouseEvent) {
      if (
        searchBlockRef.current &&
        !e.composedPath().includes(searchBlockRef.current)
      )
        setIsResultOpen(false);
    }
    document.addEventListener("click", handleOnClick);
    return () => document.removeEventListener("click", handleOnClick);
  }, []);

  return (
    <div className="relative" ref={searchBlockRef}>
      <label htmlFor="search" className="relative">
        <MagnifyingGlassIcon className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-300 dark:text-violet-300" />
        <input
          type="text"
          id="search"
          autoComplete="off"
          className="h-8 w-80 rounded-full border border-slate-300 pl-9 pr-3 transition-all duration-300 dark:border-violet-300 dark:bg-violet-1000"
          value={search}
          onChange={onChange}
          onClick={() => setIsResultOpen(true)}
        />
      </label>
      {isResultOpen && result.length > 0 && (
        <div className="absolute left-1/2 top-11 z-30 flex max-h-96 w-[30rem] -translate-x-1/2 flex-col gap-2 overflow-y-auto rounded-xl bg-white p-5 drop-shadow-lg">
          {result.map(
            (res: {
              _id: string;
              title: string;
              image?: string;
              images?: string[];
              link?: string;
              shop?: { link: string };
            }) => (
              <Link
                key={res._id}
                href={
                  res.link
                    ? `/shop/${res.link}`
                    : res.shop
                    ? `/shop/${res.shop.link}/${res.title}`
                    : ""
                }
                className="flex items-center gap-2"
              >
                <Image
                  src={
                    (res.image && res.image) ||
                    (res.images && res.images[0]) ||
                    ""
                  }
                  width={70}
                  height={70}
                  alt={res.title}
                  className="aspect-square rounded-xl object-cover"
                />
                <p>{res.title}</p>
              </Link>
            )
          )}
        </div>
      )}
    </div>
  );
}
