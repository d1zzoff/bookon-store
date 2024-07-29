"use client";

import { cn } from "@/lib/utils";
import React, { Suspense } from "react";
import { RangeSlider } from "./range";
import { useFilters } from "@/lib/hooks/use-filters";
import { useQueryFilters } from "@/lib/hooks/use-query-filters";
import { LanguagesFilter } from "./languages-filter";
import { CategoriesFilter } from "./categories-filter";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const filters = useFilters();

  useQueryFilters(filters);

  const updatePrice = (prices: number[]) => {
    filters.setPrices("minPrice", prices[0]);
    filters.setPrices("maxPrice", prices[1]);
  };

  return (
    <div
      className={cn(
        "flex flex-col items-start gap-[30px] w-[270px] h-full",
        className
      )}
    >
      <h3>Фильтры</h3>

      {/* Фильтр цен */}
      <div className="flex flex-col items-start gap-5 w-full">
        <p className="font-bold">Цена, грн</p>
        <RangeSlider
          min={0}
          max={5000}
          step={10}
          value={[
            filters.prices.minPrice || 0,
            filters.prices.maxPrice || 5000,
          ]}
          onValueChange={updatePrice}
        />

        <div className="flex items-start w-full gap-[10px]">
          <input
            type="number"
            className="w-full h-10 rounded-[15px] border border-grey-200 outline-none px-[15px]"
            placeholder="от"
            value={String(filters.prices.minPrice || 0)}
            onChange={(e) =>
              filters.setPrices("minPrice", Number(e.target.value))
            }
            min={0}
            max={5000}
          />
          <input
            type="number"
            className="w-full h-10 rounded-[15px] border border-grey-200 outline-none px-[15px]"
            placeholder="до"
            value={String(filters.prices.maxPrice || 5000)}
            onChange={(e) =>
              filters.setPrices("maxPrice", Number(e.target.value))
            }
            min={0}
            max={5000}
          />
        </div>
      </div>

      {/* Фильтры категории и языка */}
      <CategoriesFilter />
      {/* <LanguagesFilter /> */}
    </div>
  );
};
