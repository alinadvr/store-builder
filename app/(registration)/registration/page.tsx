"use client";

import { ThemeToggle } from "@/components/layout/Header/ThemeToogle";
import { Loading } from "@/components/layout/Loading";
import registrationBackground from "@/public/registration_background.svg";
import {
  AtSymbolIcon,
  BuildingStorefrontIcon,
  ComputerDesktopIcon,
  HeartIcon,
  LockClosedIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

export default function Registration() {
  const router = useRouter();
  const session = useSession();

  async function handleSubmit(formData: FormData) {
    try {
      const { data } = await axios.post("/api/registration", {
        title: formData.get("title")?.valueOf(),
        email: formData.get("email")?.valueOf(),
        password: formData.get("password")?.valueOf(),
      });

      if (data.status === 400) return toast.error(data.message);

      await router.push(`/login`);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <header className="mx-auto flex h-16 w-5/6 items-center justify-between text-white dark:text-violet-300">
        <h1>
          <Link href="/" className="font-bold">
            <span className="text-xl">SHOPS</span>.com
          </Link>
        </h1>
        <div className="flex w-4/12 min-w-[16rem] justify-between">
          <section className="flex items-center gap-3">
            <ThemeToggle style="white" />
          </section>
          <section className="flex items-center gap-3">
            <Link href="/wishlist">
              <HeartIcon />
            </Link>
            <Link href="/cart">
              <ShoppingCartIcon />
            </Link>
            {session.status === "authenticated" ? (
              <>
                <Link
                  href={
                    session.data?.user?.image
                      ? `/${session.data?.user?.image}/admin`
                      : "/account"
                  }
                >
                  <UserCircleIcon />
                </Link>
              </>
            ) : session.status === "unauthenticated" ? (
              <UserCircleIcon
                onClick={() => signIn()}
                className="cursor-pointer"
              />
            ) : (
              <Loading />
            )}
          </section>
        </div>
      </header>
      <main>
        <section className="mt-[5vh] flex flex-col items-center gap-5">
          <p className="text-center text-2xl text-white">
            Ready to get your own shop? <br />
            Sign up for <span className="font-bold">FREE</span> now!
          </p>
          <form
            action={handleSubmit}
            className="flex flex-col items-center gap-3"
          >
            <div className="relative flex w-fit items-center">
              <BuildingStorefrontIcon className="absolute left-3 text-violet-400" />
              <input
                type="text"
                placeholder="Shop name"
                required={true}
                name="title"
                className="h-12 w-[34rem] rounded-lg bg-fog-900 pl-10 text-violet-800 placeholder:text-violet-400 focus:bg-white"
              />
            </div>
            <div className="relative flex w-fit items-center">
              <AtSymbolIcon className="absolute left-3 text-violet-400" />
              <input
                type="email"
                placeholder="Email"
                required={true}
                name="email"
                className="h-12 w-[34rem] rounded-lg bg-fog-900 pl-10 text-violet-800 placeholder:text-violet-400 focus:bg-white"
              />
            </div>
            <div className="relative flex w-fit items-center">
              <LockClosedIcon className="absolute left-3 text-violet-400" />
              <input
                type="password"
                placeholder="Password"
                required={true}
                name="password"
                className="h-12 w-[34rem] rounded-lg bg-fog-900 pl-10 text-violet-800 placeholder:text-violet-400 focus:bg-white"
              />
            </div>
            <button
              type="submit"
              className="h-14 w-40 rounded-lg border border-white text-lg font-bold text-white"
            >
              Sign Up
            </button>
          </form>
        </section>
        <section
          className="mt-80 flex flex-col items-center gap-5"
          id="details"
        >
          <h3 className="text-2xl font-bold text-violet-600">
            Just 3 steps to get started
          </h3>
          <ul className="flex w-1/2 justify-between">
            <li className="flex flex-col items-center gap-3 text-violet-400">
              <span>Create an account</span>
              <UserPlusIcon className="h-24 w-24 rounded-[30px] border-2 border-violet-400 stroke-1 p-3" />
            </li>
            <li className="flex flex-col items-center gap-3 text-violet-400">
              <span>Choose a design or create your own</span>
              <ComputerDesktopIcon className="h-24 w-24 rounded-[30px] border-2 border-violet-400 stroke-1 p-3" />
            </li>
            <li className="flex flex-col items-center gap-3 text-violet-400">
              <span>Add products</span>
              <BuildingStorefrontIcon className="h-24 w-24 rounded-[30px] border-2 border-violet-400 stroke-1 p-3" />
            </li>
          </ul>
        </section>
        <Image
          src={registrationBackground}
          alt="background"
          className="absolute top-0 -z-10 min-h-[60vh] w-screen object-cover dark:brightness-50"
        />
      </main>
      <ToastContainer />
    </>
  );
}
