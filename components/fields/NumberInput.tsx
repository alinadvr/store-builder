"use client";

import classNames from "@/utils/classNames";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import onChange = toast.onChange;

interface NumberInputProps {
  placeHolder?: string;
  id?: string;
  name?: string;
  required?: boolean;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  size?: "wide" | "narrow";
  onChange?: (amount: number) => void;
}

export function NumberInput({
  placeHolder,
  id,
  name,
  required,
  defaultValue,
  min,
  max,
  step,
  size = "wide",
  onChange,
}: NumberInputProps) {
  const [value, setValue] = useState<number>(defaultValue || 0);
  function decrement() {
    if (min !== undefined) {
      if ((step && value - step >= min) || (!step && value > min))
        setValue((prevState) => (step ? prevState - step : prevState - 1));
    } else {
      setValue((prevState) => (step ? prevState - step : prevState - 1));
    }
  }

  function increment() {
    if (max !== undefined) {
      if ((step && value <= max - step) || value < max)
        setValue((prevState) => (step ? prevState + step : prevState + 1));
    } else {
      setValue((prevState) => (step ? prevState + step : prevState + 1));
    }
  }

  useEffect(() => onChange && onChange(value), [value]);

  return (
    <div className="flex items-center gap-1">
      <button onClick={decrement} type="button">
        <MinusIcon className="text-slate-300 dark:text-violet-600" />
      </button>
      <input
        type="number"
        placeholder={placeHolder}
        id={id}
        name={name}
        required={required}
        value={value.toString()}
        onChange={(e) => setValue(Number(e.target.value))}
        min={min}
        max={max}
        step={step}
        className={classNames(
          "rounded-xl border border-slate-200 p-2 text-center placeholder:text-slate-300 dark:border-violet-600 dark:bg-violet-1000 dark:text-violet-300 dark:placeholder:text-violet-600",
          size === "wide" ? "w-full" : "w-14"
        )}
      />
      <button onClick={increment} type="button">
        <PlusIcon className="text-slate-300 dark:text-violet-600" />
      </button>
    </div>
  );
}
