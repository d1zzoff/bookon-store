"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useFilters } from "@/lib/hooks/use-filters";
import { RefreshCw } from "lucide-react";
import React from "react";

interface Props {
  className?: string;
}

export const ResetButton: React.FC<Props> = ({ className }) => {
  const { resetFilters } = useFilters();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button onClick={resetFilters} className={className}>
            <RefreshCw className="text-dark w-5 h-5" strokeWidth={2} />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Очистка фильтров</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
