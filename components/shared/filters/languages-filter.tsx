"use client";

import { getLanguages } from "@/lib/actions/products";
import useSWR from "swr";
import { CheckboxGroup } from "../checkbox-group";
import { useFilters } from "@/lib/hooks/use-filters";
import { useEffect } from "react";

export const LanguagesFilter: React.FC = () => {
  const filters = useFilters();

  const { data, isLoading } = useSWR("languages", getLanguages);

  return (
    <CheckboxGroup
      loading={isLoading}
      items={data || []}
      title="Языки"
      selectedValues={filters.languages}
      onClickCheckbox={filters.setLanguages}
    />
  );
};
