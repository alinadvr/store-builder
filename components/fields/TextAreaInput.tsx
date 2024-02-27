interface TextAreaInputProps {
  id?: string;
  name?: string;
  placeholder?: string;
  cols?: number;
  rows?: number;
}

export function TextAreaInput({
  id,
  name,
  placeholder,
  rows,
  cols,
}: TextAreaInputProps) {
  return (
    <textarea
      id={id}
      name={name}
      placeholder={placeholder}
      cols={cols}
      rows={rows}
      className="min-h-[16rem] w-full rounded-xl border border-slate-200 p-2 placeholder:text-slate-300 focus:outline-none"
    ></textarea>
  );
}
