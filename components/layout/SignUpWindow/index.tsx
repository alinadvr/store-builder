"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

import classNames from "@/utils/classNames";

import { AtSymbolIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { SignUpInputField } from "@/components/fields/SignUpInputField";
import { DefaultMessages } from "@/types/manifest";

export function SignUpWindow() {
  const [activeTab, setActiveTab] = useState(0);

  const router = useRouter();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    try {
      const response = await signIn("credentials", {
        email: formData.get("email")?.valueOf(),
        password: formData.get("password")?.valueOf(),
        loginType: activeTab === 0 ? "user" : "shop",
        redirect: false,
      });

      if (!response || response.status !== 200)
        return toast.error(response?.error ?? DefaultMessages.ServerError);

      if (response.status === 200) router.push("/");
    } catch (e) {
      toast.error(DefaultMessages.ServerError);
    }
  }

  return (
    <div className="flex h-2/3 min-h-[36rem] w-[28%] items-center justify-center gap-5 rounded-[20px] bg-violet-100 dark:bg-violet-800">
      <div className="grid w-3/4 gap-4">
        <h2 className="text-center text-2xl text-violet-600 dark:text-violet-100">
          Welcome Back!
        </h2>
        <ul className="relative my-6 flex text-center transition-colors">
          {["As customer", "As seller"].map((tab, index) => (
            <li
              key={index}
              className={classNames(
                "w-1/2 cursor-pointer border-b border-violet-300 pb-1 transition-colors hover:border-violet-400 dark:border-violet-500 dark:hover:border-violet-400",
                activeTab === index
                  ? "text-violet-500 dark:text-violet-200"
                  : "text-violet-300 hover:text-violet-400 dark:text-violet-500 dark:hover:text-violet-400",
              )}
              onClick={() => setActiveTab(index)}
            >
              {tab}
            </li>
          ))}
          <div
            className={classNames(
              "absolute bottom-0 h-2 w-1/2 border-b border-violet-500 transition-transform duration-300 dark:border-violet-200",
              activeTab ? "translate-x-full" : "translate-x-0",
            )}
          ></div>
        </ul>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="relative">
            <SignUpInputField
              type="email"
              placeHolder="Email"
              id="email"
              name="email"
              required={true}
            />
            <AtSymbolIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-violet-300 dark:text-violet-900" />
          </div>
          <div className="relative">
            <SignUpInputField
              type="password"
              placeHolder="Password"
              id="password"
              name="password"
              required={true}
            />
            <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-violet-300 dark:text-violet-900" />
          </div>
          <div className="flex justify-end">
            <Link href="#" className="text-violet-500 dark:text-violet-400">
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="h-12 w-full rounded-lg bg-violet-600 text-center text-white dark:bg-violet-500"
          >
            Sign in
          </button>
        </form>
        <button
          type="button"
          className={classNames(
            "flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-white text-violet-500 dark:bg-violet-300 dark:text-white",
            activeTab === 1
              ? "pointer-events-none opacity-0"
              : "opacity-1 pointer-events-auto",
          )}
          onClick={() =>
            signIn("google", { callbackUrl: "http://localhost:3000" })
          }
        >
          <Image
            src="/google_logo.svg"
            alt="Sign in with Google"
            width={30}
            height={30}
          />
          <span>Sign in with Google</span>
        </button>
        <p className="text-center text-violet-500 dark:text-violet-400">
          Do not have an account?{" "}
          <Link href="/registration" className="font-bold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
