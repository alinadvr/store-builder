import classNames from "@/utils/classNames";

export function Page({
  page,
  isActive,
  onClick,
}: {
  page: number | string;
  isActive?: boolean;
  onClick?: () => void;
}) {
  return (
    <li
      className={classNames(
        "flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg",
        isActive
          ? "bg-violet-200 text-violet-800 dark:bg-violet-500 dark:text-violet-100"
          : "dark:text-violet-300"
      )}
      onClick={onClick}
    >
      {page}
    </li>
  );
}
