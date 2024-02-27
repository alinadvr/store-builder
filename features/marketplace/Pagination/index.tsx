import { Page } from "@/features/marketplace/Pagination/Page";
import classNames from "@/utils/classNames";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export function Pagination() {
  const [activePage, setActivePage] = useState(1);
  const pages = Array.from({ length: 10 }, (_, i) => i + 1);

  function handlePrevClick() {
    if (activePage !== 1) setActivePage((prevState) => prevState - 1);
  }

  function handleNextClick() {
    if (activePage < pages.length) setActivePage((prevState) => prevState + 1);
  }

  return (
    <ul className="flex items-center">
      <li key="prev">
        <button
          className={classNames(
            "mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-[0_0_2px] dark:bg-violet-950 dark:text-violet-300",
            activePage > 1
              ? "opacity-1 pointer-events-auto"
              : "pointer-events-none opacity-0"
          )}
          onClick={handlePrevClick}
        >
          <ChevronLeftIcon className="w-4 text-slate-400" />
        </button>
      </li>
      {pages.map((page) => {
        if (activePage === 1) {
          if (page < activePage + 4 || page === pages.length) {
            return (
              <Page
                key={page}
                page={page}
                isActive={activePage === page}
                onClick={() => setActivePage(page)}
              />
            );
          } else if (page === activePage + 5) {
            return <Page key="..." page="..." />;
          }
        } else if (activePage > pages.length - 4 && page > pages.length - 4) {
          return (
            <Page
              key={page}
              page={page}
              isActive={activePage === page}
              onClick={() => setActivePage(page)}
            />
          );
        } else if (activePage > pages.length - 5 && page > pages.length - 6) {
          return (
            <Page
              key={page}
              page={page}
              isActive={activePage === page}
              onClick={() => setActivePage(page)}
            />
          );
        } else {
          if (
            (page >= activePage - 1 && page < activePage + 3) ||
            page === pages.length
          ) {
            return (
              <Page
                key={page}
                page={page}
                isActive={activePage === page}
                onClick={() => setActivePage(page)}
              />
            );
          } else if (page === activePage + 4) {
            return <Page key="..." page="..." />;
          }
        }
      })}
      <li key="next">
        <button
          className={classNames(
            "ml-3 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-[0_0_2px] dark:bg-violet-950 dark:text-violet-300",
            activePage !== pages.length
              ? "opacity-1 pointer-events-auto"
              : "pointer-events-none opacity-0"
          )}
          onClick={handleNextClick}
        >
          <ChevronRightIcon className="w-4 text-slate-400" />
        </button>
      </li>
    </ul>
  );
}
