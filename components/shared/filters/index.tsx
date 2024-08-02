"use server";

import { cn } from "@/lib/utils";
import React from "react";
import { LanguagesFilter } from "./languages-filter";
import { CategoriesFilter } from "./categories-filter";
import { ResetButton } from "./reset-button";
import { PriceFilter } from "./price-filter";
import { getCategories, getLanguages } from "@/lib/actions/products";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = async ({ className }) => {
  /* Сомнительный метод фетча в этом случае, но не нашел альтернатив
  т.к. был баг и не получалось отправлять запросы с самих компонентов */
  const [categories, languages] = await Promise.all([
    getCategories(),
    getLanguages(),
  ]);

  return (
    <div
      className={cn(
        "flex flex-col items-start gap-[30px] w-[270px]",
        className
      )}
    >
      <div className="flex items-center gap-[5px]">
        <h3>Фильтры</h3>
        <ResetButton />
      </div>

      {/* Фильтр цен */}
      <PriceFilter />

      {/* Фильтры категории и языка */}
      <CategoriesFilter categories={categories} />
      <LanguagesFilter languages={languages} />
    </div>
  );
};
