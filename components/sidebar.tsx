"use client";
import { SignedOut } from "@clerk/nextjs";
import { links } from "@/const";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SignedIn } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Image from "next/image";
import { Separator } from "./ui/separator";

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="sidebar z-0 dark:bg-slate-950 dark:border-r dark:border-secondary">
      <div className="flex size-full flex-col gap-4">
        <nav className="sidebar-nav mt-24">
          <SignedIn>
            <ul className="sidebar-nav_elements">
              {links.slice(0, 1).map((link) => {
                let isActive = link.route === pathname ? true : false;
                return (
                  <>
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
                          alt="logo"
                          width={24}
                          height={24}
                          className={` ${
                            isActive ? "dark:brightness-200" : ""
                          } opacity-70`}
                        />
                        {link.name}
                      </Link>
                    </li>
                  </>
                );
              })}
              <Separator />
              {links.slice(1, 6).map((link) => {
                let isActive = link.route === pathname ? true : false;
                return (
                  <>
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
                          alt="logo"
                          width={24}
                          height={24}
                          className={` ${
                            isActive
                              ? "brightness-50 dark:brightness-0 opacity-70"
                              : "brightness-0 opacity-50 "
                          } dark:invert  `}
                        />
                        {link.name}
                      </Link>
                    </li>
                  </>
                );
              })}
            </ul>
            <ul className="sidebar-nav_elements">
              <li
                className={cn(
                  `flex-center cursor-pointer gap-2 p-4  sidebar-nav_element`
                )}
              ></li>
            </ul>
          </SignedIn>
        </nav>
      </div>
    </aside>
  );
};
