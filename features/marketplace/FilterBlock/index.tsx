import { CheckBoxInput } from "@/components/fields/CheckBoxInput";
import { filters } from "@/features/marketplace/FilterBlock/mockdata";
import classNames from "@/utils/classNames";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export function FilterBlock({
  getSelectedFilter,
  handleFilterOnChange,
}: {
  getSelectedFilter: (filter: string) => { filter: string; options: string[] };
  handleFilterOnChange: (filter: string, option: string) => void;
}) {
  return (
    <aside className="h-fit w-80 shrink-0 rounded-xl shadow-border dark:bg-violet-950">
      {filters.map(({ filter, options }) => (
        <details
          open
          key={filter}
          className="border-b border-slate-100 p-1 last:border-none dark:border-violet-900"
        >
          <summary
            className={classNames(
              "m-2 flex justify-between rounded-lg px-3 py-2 text-violet-800 dark:text-violet-400",
              getSelectedFilter(filter) ? "bg-violet-50 dark:bg-violet-900" : ""
            )}
          >
            {filter}
            <ChevronDownIcon className="arrow-icon w-5 transition-transform" />
          </summary>
          <ul className="mx-5 mb-4 mt-3 flex flex-col gap-1">
            {options.map(({ option, amount }) => (
              <li
                key={option}
                className={classNames(
                  "relative flex items-center gap-3",
                  !amount
                    ? "text-slate-400 dark:text-violet-700"
                    : "dark:text-violet-300"
                )}
              >
                <CheckBoxInput
                  id={option}
                  name={option}
                  disabled={!amount}
                  checked={
                    getSelectedFilter(filter)
                      ? getSelectedFilter(filter).options.includes(option)
                      : false
                  }
                  onChange={() => handleFilterOnChange(filter, option)}
                />
                <label htmlFor={option}>
                  {option}
                  <span className="ml-3 text-sm text-slate-300 dark:text-violet-700">
                    ({amount})
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </details>
      ))}
    </aside>
  );
}
