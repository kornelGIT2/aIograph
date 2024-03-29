import React from "react";
import { Button } from "./ui/button";
import { ModeToggle } from "./theme-toggle";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { SheetMobile } from "./sheet";
import Image from "next/image";

export const Mobilenav = () => {
  return (
    <nav className="bg-white dark:text-white h-20 shadow-sm dark:border-b dark:border-secondary fixed w-full grid grid-cols-2 z-[50] dark:bg-slate-950">
      <div className="flex justify-start items-center ml-6 gap-4">
        <Link
          className="hidden lg:inline-block bg-primary text-transparent bg-clip-text text-3xl font-bold tracking-tight"
          href="/"
        >
          AIograph
        </Link>{" "}
        <SheetMobile>
          <svg
            className="w-5 h-5 cursor-pointer lg:hidden text-slate-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </SheetMobile>
      </div>
      <SignedOut>
        <div className="flex justify-end items-center gap-6 mr-6">
          <Link className="bg-transparent hover:text-slate-500" href="/sign-in">
            Sign in
          </Link>
          <Button asChild className="rounded-3xl">
            <Link
              className="flex justify-center items-center gap-1 text-slate-50"
              href="/sign-up"
            >
              Get Started
              <Image
                src="/arrow.svg"
                alt="arrow"
                height={20}
                width={20}
                className="invert"
              />
            </Link>
          </Button>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="flex justify-end items-center mr-4 gap-4">
          <ModeToggle />

          <UserButton afterSignOutUrl="/" />
        </div>
      </SignedIn>
    </nav>
  );
};
