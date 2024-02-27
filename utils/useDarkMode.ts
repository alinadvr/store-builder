import { useEffect, useState } from "react";

export function useDarkMode() {
  const [theme, setTheme] = useState<string>();

  useEffect(() => {
    const storageTheme = localStorage.getItem("theme");
    setTheme(
      storageTheme
        ? storageTheme
        : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    );
  }, []);

  useEffect(() => {
    if (theme) {
      if (theme === "dark") document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");

      theme && localStorage.setItem("theme", theme);
    }
  }, [theme]);

  return {
    theme,
    setTheme: () =>
      setTheme((prevState) => (prevState === "light" ? "dark" : "light")),
  };
}
