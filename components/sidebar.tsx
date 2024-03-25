"use client";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./theme-toggle";
import { links } from "@/const";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SignedIn } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="flex size-full flex-col gap-4">
        <div className="flex items-center justify-center gap-4">
          <Link
            className="sidebar-logo bg-gradient-to-r from-green-500 to-green-600 inline-block text-transparent bg-clip-text text-3xl font-bold tracking-tight"
            href="/"
          >
            App Name
          </Link>
          <ModeToggle />
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
                        ? "bg-gradient-to-r from-green-500 to-green-400 text-white"
                        : "text-gray-400"
                    } sidebar-nav_element group  cursor-pointer`}
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
              >
                <UserButton afterSignOutUrl="/" showName />
              </li>
            </ul>
          </SignedIn>
        </nav>
      </div>
    </aside>
  );
};
