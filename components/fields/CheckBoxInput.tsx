import { CheckIcon } from "@heroicons/react/24/outline";

interface CheckBoxInputProps {
  id?: string;
  name?: string;
  disabled?: boolean;
  checked?: boolean;
  onChange?: () => void;
}

export function CheckBoxInput({
  id,
  name,
  disabled,
  checked,
  onChange,
}: CheckBoxInputProps) {
  return (
    <>
      <input
        type="checkbox"
        id={id}
        name={name}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
        className="absolute h-5 w-5"
      />
      <span className="checkbox flex h-5 w-5 items-center justify-center rounded-sm border border-slate-300 dark:border-violet-400">
        <CheckIcon className="check-icon pointer-events-none w-4 stroke-[3] text-violet-800 opacity-0" />
      </span>
    </>
  );
}
