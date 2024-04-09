"use client";

import classNames from "@/utils/classNames";
import { useDarkMode } from "@/hooks/useDarkMode";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

export function ThemeToggle({
  style = "slate",
}: {
  style?: "white" | "black" | "slate";
}) {
  const { theme, setTheme } = useDarkMode();

  return (
    <button
      type="button"
      className={classNames(
        "flex h-8 w-16 rounded-full border dark:border-violet-300",
        style === "white"
          ? "border-white"
          : style === "black"
            ? "border-slate-700"
            : "border-slate-300",
      )}
      onClick={setTheme}
    >
      <SunIcon
        className={classNames(
          "relative top-1/2 -translate-y-1/2 transition-all duration-300",
          theme === "light" ? "opacity-1 left-1.5" : "left-1/3 opacity-0",
          style === "white"
            ? "text-white"
            : style === "black"
              ? "text-slate-700"
              : "text-slate-300",
        )}
      />
      <MoonIcon
        className={classNames(
          "relative top-1/2 w-5 -translate-y-1/2 text-violet-300 transition-all duration-300",
          theme === "light" ? "-left-1/3 opacity-0" : "opacity-1 left-2.5",
        )}
      />
    </button>
  );
}
