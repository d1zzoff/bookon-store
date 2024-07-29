"use client";

import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import React from "react";
import { Rating } from "../rating";
import { Product } from "@/lib/actions/products";

interface Props {
  className?: string;
  item: Product;
}

export const ProductItem: React.FC<Props> = ({ className, item }) => (
  <div
    className={cn("w-full max-w-[290px] h-[440px] flex flex-col", className)}
  >
    <div className="w-full h-[260px] rounded-[15px] bg-grey-100 relative">
      <img
        className="abosulte w-full h-full object-contain"
        src={item.images[0]}
        alt={item.title}
      />
    </div>

    <div className="flex flex-col items-start gap-[7px] mt-[15px]">
      <h3 className="leading-[120%]">{item.title}</h3>
      <p className="text-grey-400 font-medium leading-none">{item.author}</p>
    </div>

    <div className="flex flex-col gap-[5px] items-start mt-auto">
      <div className="flex items-center w-full justify-between">
        <h3>{item.price} грн</h3>
        <Rating value={item.rating} className="mx-[-2px]" />
      </div>

      <Button variant={"outline"} size={"full"}>
        + Добавить
      </Button>
    </div>
  </div>
);
