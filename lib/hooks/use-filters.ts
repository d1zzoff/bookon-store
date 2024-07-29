"use client";

import { useSearchParams } from "next/navigation";
import React from "react";
import { useCategoryFilter } from "./use-category-filter";
import { useSort } from "./use-sort";
import { useLanguageFilter } from "./use-language-filter";

interface PriceProps {
  minPrice?: number;
  maxPrice?: number;
}

export interface Filters {
  categories: string[];
  prices: PriceProps;
  sort: string | undefined | null;
  languages: string[];
}

interface ReturnProps extends Filters {
  setPrices: (name: keyof PriceProps, value: number) => void;
  setCategories: (v: string) => void;
  setSort: (v: string | null) => void;
  setLanguages: (v: string) => void;
  resetFilters: () => void;
}

export const useFilters = (): ReturnProps => {
  const { categories, toggleCategory, setCategories } = useCategoryFilter();
  const { languages, toggleLanguage, setLanguages } = useLanguageFilter();
  const { sort, setSort } = useSort();

  const searchParams = useSearchParams();

  React.useEffect(() => {
    const sortParam = searchParams.get("sort");
    setSort(sortParam);
  }, []);

  const [prices, setPrices] = React.useState<PriceProps>({
    minPrice: Number(searchParams.get("minPrice")) || undefined,
    maxPrice: Number(searchParams.get("maxPrice")) || undefined,
  });

  React.useEffect(() => {
    const categoriesParam = searchParams.get("categories");
    const categoriesArray = categoriesParam ? categoriesParam.split(",") : [];

    setCategories(categoriesArray);
  }, [searchParams, setCategories]);

  React.useEffect(() => {
    const languagesParam = searchParams.get("languages");
    const languagesArray = languagesParam ? languagesParam.split(",") : [];

    setLanguages(languagesArray);
  }, [searchParams, setLanguages]);

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrices((prev) => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setPrices({});
    setCategories([]);
    setLanguages([]);
  };

  return {
    categories,
    languages,
    prices,
    setPrices: updatePrice,
    setCategories: toggleCategory,
    setLanguages: toggleLanguage,
    setSort,
    sort,
    resetFilters,
  };
};
