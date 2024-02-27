import { useEffect, useState } from "react";

export function useLocalStorage({
  key,
  defaultValue,
}: {
  key: string;
  defaultValue: string | string[];
}) {
  const [value, setValue] = useState<string | string[]>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storageValue = localStorage.getItem(key);
      setValue(storageValue ? JSON.parse(storageValue) : defaultValue);
    }
  }, []);

  useEffect(() => {
    value && localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  function clearValue() {
    setValue((prevState) => {
      if (typeof prevState === "string") return "";
      if (prevState) return [];
    });
  }

  return {
    value,
    setValue: (value: string) =>
      setValue((prevState) => {
        if (typeof prevState === "string") return value;
        if (prevState) {
          return prevState.indexOf(value) !== -1
            ? prevState.filter((state) => state !== value)
            : [...prevState, value];
        }
      }),
    clearValue,
  };
}
