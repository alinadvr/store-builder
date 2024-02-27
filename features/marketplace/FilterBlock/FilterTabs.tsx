import { XMarkIcon } from "@heroicons/react/24/outline";

export function FilterTabs({
  selectedFilters,
  handleFilterOnChange,
  clearAll,
}: {
  selectedFilters: { filter: string; options: string[] }[];
  handleFilterOnChange: (filter: string, option: string) => void;
  clearAll: () => void;
}) {
  return (
    <>
      <ul className="selected-filters__tabs flex max-w-[70%] gap-3 overflow-auto">
        {selectedFilters.map(({ filter, options }) =>
          options.map((option) => (
            <li
              key={option}
              className="relative flex shrink-0 rounded-full border border-violet-800 bg-violet-50 px-10 py-1.5 text-violet-800 dark:border-violet-300 dark:bg-violet-900 dark:text-violet-300"
            >
              {option}
              <XMarkIcon
                className="absolute right-3 top-1/2 w-4 -translate-y-1/2 cursor-pointer text-violet-400"
                onClick={() => handleFilterOnChange(filter, option)}
              />
            </li>
          ))
        )}
      </ul>
      <button
        type="button"
        onClick={clearAll}
        className="text-slate-300 dark:text-violet-800"
      >
        Clear all
      </button>
    </>
  );
}
