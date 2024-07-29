"use client";

import { getCategories } from "@/lib/actions/products";
import useSWR from "swr";
import { CheckboxGroup } from "../checkbox-group";
import { useFilters } from "@/lib/hooks/use-filters";
import { useEffect } from "react";

export const CategoriesFilter: React.FC = () => {
  const filters = useFilters();

  const { data, isLoading } = useSWR("categories", getCategories);

  return (
    <CheckboxGroup
      loading={isLoading}
      items={data || []}
      title="Категории"
      selectedValues={filters.categories}
      onClickCheckbox={filters.setCategories}
    />
  );
};
