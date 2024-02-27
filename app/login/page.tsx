import { SignUpWindow } from "@/components/layout/SignUpWindow";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export const metadata = {
  title: "SHOPS.com - Log In",
};

export default function LoginPage() {
  return (
    <div className="relative flex h-screen w-screen items-center justify-center bg-violet-400">
      <Link
        href="/"
        className="absolute left-2 top-3 flex gap-2 rounded-xl bg-violet-600 px-5 py-2 text-white drop-shadow-lg"
      >
        <ArrowLeftIcon />
        Back
      </Link>
      <SignUpWindow />
    </div>
  );
}
