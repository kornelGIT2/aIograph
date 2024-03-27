"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { links } from "@/const";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { SignedIn } from "@clerk/nextjs";
import { Separator } from "./ui/separator";

export const SheetMobile = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent
        side={"left"}
        className="sheet-content dark:border-r dark:border-secondary dark:bg-slate-950"
      >
        <SheetHeader>
          <SheetTitle className="text-3xl text-primary mb-6">
            AIograph
          </SheetTitle>
        </SheetHeader>

        <SignedIn>
          <ul className="header-nav_elements">
            {links.slice(0, 1).map((link) => {
              let isActive = link.route === pathname ? true : false;
              return (
                <li
                  className={`${
                    isActive
                      ? "text-primary dark:hover:text-white hover:text-black"
                      : "dark:hover:text-white text-slate-400 hover:text-black"
                  } sidebar-nav_element group cursor-pointer hover:opacity-70  `}
                  key={link.name}
                >
                  <Link className="sidebar-link" href={link.route}>
                    <Image
                      src={link.icon ? link.icon : ""}
                      height={24}
                      width={24}
                      alt="logo"
                      className={` ${
                        isActive ? "dark:brightness-200" : ""
                      } opacity-70`}
                    />
                    {link.name}
                  </Link>
                </li>
              );
            })}
            <Separator />
            {links.slice(1, 6).map((link) => {
              let isActive = link.route === pathname ? true : false;
              return (
                <li
                  className={`${
                    isActive
                      ? "text-primary dark:hover:text-white hover:text-black"
                      : "dark:hover:text-white text-slate-400 hover:text-black"
                  } sidebar-nav_element group cursor-pointer  hover:opacity-70`}
                  key={link.name}
                >
                  <Link className="sidebar-link" href={link.route}>
                    <Image
                      src={link.icon ? link.icon : ""}
                      height={24}
                      width={24}
                      alt="logo"
                      className={` ${
                        isActive
                          ? "brightness-50 dark:brightness-0 opacity-70"
                          : "brightness-0 "
                      } dark:invert opacity-50`}
                    />
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </SignedIn>
        <ul className="sidebar-nav_elements">
          <li
            className={cn(
              `flex-center cursor-pointer gap-2 p-4  sidebar-nav_element`
            )}
          ></li>
        </ul>
      </SheetContent>
    </Sheet>
  );
};
