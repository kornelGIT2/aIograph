import React from "react";
import { Button } from "./ui/button";
import { ModeToggle } from "./theme-toggle";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { SheetMobile } from "./sheet";

export const Mobilenav = () => {
  return (
    <nav className="bg-white h-20 shadow-md fixed w-full grid grid-cols-2  dark:bg-slate-900">
      <div className="flex  justify-start items-center ml-4 gap-4">
        <Link
          className="hidden lg:inline-block bg-primary text-transparent bg-clip-text text-3xl font-bold tracking-tight"
          href="/"
        >
          AI*ograph
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
      <div className="flex justify-end items-center gap-4 mr-4">
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
};
