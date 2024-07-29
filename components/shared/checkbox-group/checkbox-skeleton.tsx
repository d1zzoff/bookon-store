"use client";

import React, { useState } from "react";
import { CheckboxItem } from "./checkbox-item";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export interface CheckboxItem {
  text: string;
  value: string;
}

interface Props {
  className?: string;
  title: string;
}

export const CheckboxGroupSkeleton: React.FC<Props> = ({
  className,
  title,
}) => {
  return (
    <div
      className={cn("flex flex-col items-start gap-[15px] w-full", className)}
    >
      <p className="font-bold">{title}</p>
      <div className="flex flex-col items-start gap-[15px] w-full overflow-y-auto h-full flex-shrink-0 max-h-[300px] py-[1px]">
        {[...Array(5)].map((_, i) => (
          <Skeleton className="w-full h-5 rounded-full" key={i} />
        ))}
      </div>

      <Skeleton className="w-[125px] rounded-full h-6" />
    </div>
  );
};
