"use client";

import React from "react";
import { Button } from "../ui";
import { cn } from "@/lib/utils";
import { Product } from "@/lib/actions/products";

export const ProductDescription = ({ data }: { data: Product }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={cn(
        "relative w-full rounded-[20px] bg-light p-5 overflow-hidden",
        isExpanded ? "max-h-none" : "max-h-[300px]"
      )}
    >
      <h4>Характеристика и описание</h4>

      <div className="flex items-start gap-[50px] my-[20px]">
        <div className="flex flex-col gap-[7px] items-start text-grey-400">
          <p>Категория</p>
          <p>Язык</p>
          <p>Издательство</p>
          <p>Год издания</p>
          <p>Обложка</p>
        </div>
        <div className="flex flex-col gap-[7px] items-start text-dark">
          <p>{data?.category?.text || "-"}</p>
          <p>{data?.language?.text || "-"}</p>
          <p>Издательство</p>
          <p>Год издания</p>
          <p>Обложка</p>
        </div>
      </div>

      <div className="text-dark mb-[70px]">{data?.description}</div>

      <div className="absolute w-[calc(100%-40px)] h-[85px] bg-light bottom-0 left-1/2 transform -translate-x-1/2">
        <Button
          variant={"outline"}
          className="absolute bottom-5 bg-light w-full"
          onClick={toggleDescription}
        >
          {isExpanded ? "Скрыть описание" : "Посмотреть полностью"}
        </Button>
      </div>
    </div>
  );
};
