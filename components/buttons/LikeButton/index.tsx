"use client";

import classNames from "@/utils/classNames";
import { HeartIcon } from "@heroicons/react/24/outline";

export function LikeButton({
  saved,
  updateSaved,
  size = "small",
}: {
  saved: boolean;
  updateSaved: () => void;
  size?: "small" | "big";
}) {
  return (
    <HeartIcon
      onClick={updateSaved}
      className={classNames(
        "cursor-pointer",
        saved
          ? "fill-black dark:fill-violet-300"
          : "text-black dark:text-violet-300",
        size === "small" ? "h-6 w-6" : "h-14 w-14"
      )}
    />
  );
}
