"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <main
        className={clsx("pb-[200px] pt-[154px] h-full w-full", {
          "bg-grey-100":
            pathname.includes("checkout") || pathname.includes("product"),
        })}
      >
        {children}
      </main>
    </>
  );
}
