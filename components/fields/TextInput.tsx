"use client";

import { ChangeEvent } from "react";

interface TextInputProps {
  type: string;
  placeHolder?: string;
  id?: string;
  name?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export function TextInput({
  type,
  placeHolder,
  id,
  name,
  required,
  value,
  onChange,
  disabled,
}: TextInputProps) {
  return (
    <input
      type={type}
      placeholder={placeHolder}
      id={id}
      name={name}
      required={required}
      value={value}
      onChange={(e) => onChange && onChange(e)}
      disabled={disabled}
      className="w-full rounded-lg border border-slate-200 p-2 pl-4 text-black placeholder:text-slate-300 dark:border-none dark:bg-violet-500 dark:text-violet-950 dark:placeholder:text-violet-800"
    />
  );
}
