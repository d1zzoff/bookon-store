import { cn } from "@/lib/utils";
import React from "react";
import { AiFillStar } from "react-icons/ai";

interface Props {
  className?: string;
  value: number;
}

export const Rating: React.FC<Props> = ({ className, value }) => {
  return (
    <div className={cn("flex items-center gap-[2px]", className)}>
      {[...Array(5)].map((_, i) => (
        <AiFillStar
          key={i}
          className={value > i ? "text-yellow" : "text-grey-200"}
          size={22}
        />
      ))}
    </div>
  );
};
