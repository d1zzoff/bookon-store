"use client";

import { Category, getCategories } from "@/lib/actions/products";
import useSWR from "swr";
import { CheckboxGroup } from "../checkbox-group";
import { useFilters } from "@/lib/hooks/use-filters";

interface Props {
  className?: string;
  categories: Category[];
}

export const CategoriesFilter: React.FC<Props> = ({
  className,
  categories,
}) => {
  const filters = useFilters();

  return (
    <CheckboxGroup
      items={categories}
      title="Категории"
      selectedValues={filters.categories}
      onClickCheckbox={filters.setCategories}
      className={className}
    />
  );
};
