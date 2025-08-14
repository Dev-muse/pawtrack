"use client";

import React from "react";
import Logo from "./logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
const AppNav = [
  {
    id: 1,
    label: "Dashboard",
    route: "/app/dashboard",
  },
  {
    id: 2,
    label: "Account",
    route: "/app/account",
  },
];
const AppHeader = () => {
  const activePath = usePathname();
   const NavRoutes = AppNav.map((item) => (
    <li key={item.id}>
      <Link
        className={cn("text-white/70  backdrop:blur-sm rounded-sm px-2 py-1 hover:text-white focus:text-white transition duration-300 ",{
          "bg-black/10 text-white": item.route==activePath
         })}
        href={item.route}
      >
        {item.label}
      </Link>
    </li>
  ));
  return (
    <header className="flex justify-between items-center border-b border-white/40 py-2 ">
      <Logo />
      <nav>
        <ul className="flex gap-4 items-center me-4 ">{NavRoutes}</ul>
      </nav>
    </header>
  );
};

export default AppHeader;
