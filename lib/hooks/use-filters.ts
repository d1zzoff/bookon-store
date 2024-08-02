"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useCategoryFilter } from "./use-category-filter";
import { useSort } from "./use-sort";
import { useLanguageFilter } from "./use-language-filter";
import qs from "qs";

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
  const router = useRouter();

  const { categories, toggleCategory, setCategories } = useCategoryFilter();
  const { languages, toggleLanguage, setLanguages } = useLanguageFilter();
  const { sort, setSort } = useSort();

  const [prices, setPrices] = React.useState<PriceProps>({});

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrices((prev) => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setPrices({});
    setCategories([]);
    setLanguages([]);
  };

  React.useEffect(() => {
    const params = {
      ...prices,
      languages: Array.from(languages),
      categories: Array.from(categories),
      sort: sort,
    };

    const query = qs.stringify(params, {
      arrayFormat: "comma",
      skipNulls: true,
    });

    router.push(`?${query}`, {
      scroll: false,
    });
  }, [languages, categories, prices, sort]);

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
