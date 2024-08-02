"use client";

import { Language } from "@/lib/actions/products";
import { CheckboxGroup } from "../checkbox-group";
import { useFilters } from "@/lib/hooks/use-filters";

interface Props {
  className?: string;
  languages: Language[];
}

export const LanguagesFilter: React.FC<Props> = ({ className, languages }) => {
  const filters = useFilters();

  return (
    <CheckboxGroup
      loading={false}
      items={languages || []}
      title="Языки"
      selectedValues={filters.languages}
      onClickCheckbox={filters.setLanguages}
      className={className}
    />
  );
};
