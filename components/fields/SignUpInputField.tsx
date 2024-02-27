import { ChangeEvent } from "react";

export function SignUpInputField({
  type,
  placeHolder,
  id,
  name,
  required,
  value,
  onChange,
}: {
  type: string;
  placeHolder?: string;
  id?: string;
  name?: string;
  required?: boolean;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      type={type}
      placeholder={placeHolder}
      id={id}
      name={name}
      required={required}
      value={value}
      onChange={onChange}
      className="h-11 w-full rounded-lg bg-fog-700 pl-10 placeholder:text-violet-300 focus:bg-white dark:bg-violet-transparent dark:placeholder:text-violet-900"
    />
  );
}
