import { SecondaryButton } from "@/components/buttons/SecondaryButton";
import { InboxIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";

export function EmptyState({ type }: { type: "cart" | "wish list" }) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 text-slate-300 dark:text-violet-300">
      <p className="text-2xl">Your {type} is empty</p>
      {type === "cart" ? (
        <ShoppingCartIcon className="w-40 stroke-1" />
      ) : (
        <InboxIcon className="w-40 stroke-1" />
      )}
      <SecondaryButton
        buttonType="link"
        text="Go Shopping"
        to="/"
        className="h-12 w-56"
      />
    </div>
  );
}
