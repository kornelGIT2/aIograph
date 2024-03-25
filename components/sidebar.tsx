"use client";
import { SignedOut, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./theme-toggle";
import { links } from "@/const";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SignedIn } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="sidebar z-0 dark:bg-slate-900 ">
      <div className="flex size-full flex-col gap-4">
        <div className="flex items-center justify-center gap-4">
          <Link
            className="sidebar-logo bg-primary inline-block text-transparent bg-clip-text text-3xl font-bold tracking-tight"
            href="/"
          >
            AIograph
          </Link>
        </div>
        <nav className="sidebar-nav mt-10">
          <SignedIn>
            <ul className="sidebar-nav_elements">
              {links.slice(0, 6).map((link) => {
                let isActive = link.route === pathname ? true : false;
                return (
                  <li
                    className={`${
                      isActive
                        ? "bg-primary bg-gradient-to-b from-primary to-green-400 dark:bg-green-700 text-slate-100"
                        : "text-gray-400"
                    } sidebar-nav_element group cursor-pointer `}
                    key={link.name}
                  >
                    <Link className="sidebar-link" href={link.route}>
                      {link.name}
                    </Link>
                  </li>
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

          <SignedOut>
            <Button asChild>
              <Link className="text-red-500" href="/sign-in">
                Login
              </Link>
            </Button>
          </SignedOut>
        </nav>
      </div>
    </aside>
  );
};
