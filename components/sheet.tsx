"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { links } from "@/const";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const SheetMobile = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent side={"left"} className="sheet-content ">
        <SheetHeader>
          <SheetTitle className="text-3xl text-primary mb-10">
            AI*ograph
          </SheetTitle>

          <ul className="header-nav_elements">
            {links.slice(0, 6).map((link) => {
              let isActive = link.route === pathname ? true : false;
              return (
                <li
                  className={`${
                    isActive ? "text-primary   " : "text-gray-500"
                  } sidebar-nav_element group cursor-pointer`}
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
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
