import classNames from "@/utils/classNames";

export function Loading({
  size = "small",
}: {
  size?: "small" | "medium" | "big";
}) {
  return (
    <div
      className={classNames(
        "box-border inline-block animate-spin rounded-full border-black border-b-transparent",
        size === "small"
          ? "h-4 w-4 border"
          : size === "medium"
          ? "h-8 w-8 border"
          : "h-14 w-14 border-2"
      )}
    ></div>
  );
}
