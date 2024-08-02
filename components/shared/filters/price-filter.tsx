"use client";

import { useFilters } from "@/lib/hooks/use-filters";
import { RangeSlider } from "./range";

export const PriceFilter = () => {
  const filters = useFilters();

  const updatePrice = (prices: number[]) => {
    filters.setPrices("minPrice", prices[0]);
    filters.setPrices("maxPrice", prices[1]);
  };

  return (
    <div className="flex flex-col items-start gap-5 w-full">
      <p className="font-bold">Цена, грн</p>
      <RangeSlider
        min={0}
        max={5000}
        step={10}
        value={[filters.prices.minPrice || 0, filters.prices.maxPrice || 5000]}
        onValueChange={updatePrice}
      />

      <div className="flex items-start w-full gap-[10px]">
        <input
          type="number"
          className="w-full h-10 rounded-[15px] border border-grey-200 outline-none px-[15px]"
          placeholder="0"
          value={String(filters.prices.minPrice)}
          onChange={(e) =>
            filters.setPrices("minPrice", Number(e.target.value))
          }
          min={0}
          max={5000}
        />
        <input
          type="number"
          className="w-full h-10 rounded-[15px] border border-grey-200 outline-none px-[15px]"
          placeholder="5000"
          value={String(filters.prices.maxPrice)}
          onChange={(e) =>
            filters.setPrices("maxPrice", Number(e.target.value))
          }
          min={0}
          max={5000}
        />
      </div>
    </div>
  );
};
