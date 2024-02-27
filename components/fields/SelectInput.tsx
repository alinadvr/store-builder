interface SelectInputProps {
  options: string[];
  id?: string;
  name?: string;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
}

export function SelectInput({
  options,
  id,
  name,
  defaultValue,
  placeholder,
  required,
}: SelectInputProps) {
  return (
    <select
      id={id}
      name={name}
      defaultValue={placeholder || defaultValue}
      required={required}
      className="w-full rounded-lg border border-slate-200 p-2 text-black focus:outline-none"
    >
      {placeholder && (
        <option disabled hidden>
          {placeholder}
        </option>
      )}
      {options.map((option, index) => (
        <option key={option + index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
