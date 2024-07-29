"use client";

import { useFilters } from "@/lib/hooks/use-filters";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import React from "react";

interface Props {
  className?: string;
}

export const SortFilter: React.FC<Props> = ({ className }) => {
  const { setSort, sort } = useFilters();

  const options = [
    { text: "Новинки", value: null },
    { text: "По рейтингу", value: "rating" },
    { text: "Сначала дешевые", value: "low_price" },
    { text: "Сначала дорогие", value: "high_price" },
  ];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-[5px] rounded-[15px] bg-grey-100 p-[5px]",
        className
      )}
    >
      {options.map((el, i) => (
        <button
          className={clsx("h-10 px-2 font-medium rounded-[15px] ease-in-out", {
            "bg-light text-accent shadow-small": el.value === sort,
            "bg-none text-dark": el.value !== sort,
          })}
          key={i}
          onClick={() => setSort(el.value)}
        >
          {el.text}
        </button>
      ))}
    </div>
  );
};
