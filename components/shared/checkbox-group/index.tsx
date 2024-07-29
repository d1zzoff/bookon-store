"use client";

import React, { useState } from "react";
import { CheckboxItem } from "./checkbox-item";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import { Skeleton } from "@/components/ui/skeleton";

export interface CheckboxItem {
  text: string;
  value: string;
}

interface Props {
  className?: string;
  title: string;
  items: CheckboxItem[] | undefined;
  limit?: number;
  onClickCheckbox: (v: string) => void;
  selectedValues: string[];
  loading?: boolean;
}

export const CheckboxGroup: React.FC<Props> = ({
  className,
  title,
  items,
  limit = 5,
  onClickCheckbox,
  selectedValues,
  loading,
}) => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const itemList = show
    ? items?.filter((item) =>
        item.text.toLowerCase().includes(search.toLowerCase())
      )
    : items?.slice(0, limit);

  React.useEffect(() => {
    console.log("loading", loading);
  }, [loading]);

  return (
    <div
      className={cn("flex flex-col items-start gap-[15px] w-full", className)}
    >
      <p className="font-bold">{title}</p>
      {show && (
        <Input
          placeholder="Я ищу..."
          onChange={(e) => setSearch(e.target.value)}
        />
      )}
      <div className="flex flex-col items-start gap-[15px] w-full overflow-y-auto h-full flex-shrink-0 max-h-[300px] py-[1px]">
        {loading || !items
          ? [...Array(5)].map((_, i) => (
              <Skeleton className="w-full h-5 rounded-full" key={i} />
            ))
          : itemList?.map((item, i) => (
              <CheckboxItem
                key={i}
                text={item.text}
                value={item.value}
                checked={selectedValues.includes(item.value)}
                onClickCheckbox={() => onClickCheckbox(item.value)}
              />
            ))}
      </div>

      {loading || !items ? (
        <Skeleton className="w-[125px] rounded-full h-6" />
      ) : (
        items.length > limit && (
          <button className="flex items-center gap-[5px]">
            <ChevronDown
              size={20}
              className={clsx("text-accent transition-transform duration-300", {
                "rotate-180": show,
                "rotate-0": !show,
              })}
              strokeWidth={2}
            />
            <p
              className="font-medium text-accent hover:underline"
              onClick={() => setShow(!show)}
            >
              {show ? "Скрыть" : "Показать все"}
            </p>
          </button>
        )
      )}
    </div>
  );
};
