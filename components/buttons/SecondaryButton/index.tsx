"use client";

import classNames from "@/utils/classNames";
import Link from "next/link";

interface DefaultSecondaryButton {
  buttonType: string;
  text: string;
  className?: string;
}

interface LinkSecondaryButton extends DefaultSecondaryButton {
  buttonType: "link";
  to: string;
  onClick?: never;
  type?: never;
  disabled?: never;
}

interface ButtonSecondaryButton extends DefaultSecondaryButton {
  buttonType: "button";
  type: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  to?: never;
}

type SecondaryButtonProps = LinkSecondaryButton | ButtonSecondaryButton;

export function SecondaryButton({
  buttonType,
  type,
  text,
  to,
  onClick,
  className,
  disabled,
}: SecondaryButtonProps) {
  const style = classNames(
    "flex items-center justify-center rounded-lg border border-violet-600 text-violet-600 dark:text-violet-300 dark:border-violet-300",
    className || ""
  );

  switch (buttonType) {
    case "link":
      return (
        <Link href={to} className={style}>
          {text}
        </Link>
      );
    case "button":
      return (
        <button
          type={type}
          onClick={onClick}
          className={style}
          disabled={disabled}
        >
          {text}
        </button>
      );
    default:
      return <p>Wrong type of Secondary Button</p>;
  }
}
