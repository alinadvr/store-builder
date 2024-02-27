import { Loading } from "@/components/layout/Loading";
import classNames from "@/utils/classNames";
import Link from "next/link";

interface DefaultPrimaryButton {
  buttonType: string;
  text: string;
  className?: string;
}

interface LinkPrimaryButton extends DefaultPrimaryButton {
  buttonType: "link";
  to: string;
  onClick?: never;
  disabled?: never;
  type?: never;
  isLoading?: never;
}

interface ButtonPrimaryButton extends DefaultPrimaryButton {
  buttonType: "button";
  type: "button" | "submit" | "reset";
  isLoading?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  to?: never;
}

type PrimaryButtonProps = LinkPrimaryButton | ButtonPrimaryButton;

export function PrimaryButton({
  buttonType,
  text,
  type,
  disabled,
  onClick,
  to,
  className,
  isLoading,
}: PrimaryButtonProps) {
  let style = classNames(
    "flex items-center justify-center rounded-lg bg-violet-600 font-medium text-white disabled:opacity-60",
    className || ""
  );

  switch (buttonType) {
    case "button":
      return (
        <button
          className={style}
          type={type}
          onClick={onClick}
          disabled={disabled || isLoading}
        >
          {isLoading ? <Loading /> : text}
        </button>
      );
    case "link":
      return (
        <Link href={to} className={style}>
          {text}
        </Link>
      );
  }
}
