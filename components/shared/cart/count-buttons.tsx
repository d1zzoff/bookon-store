"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Minus, Plus } from "lucide-react";

interface Props {
  quantity: number;
  className?: string;
  increase: () => void;
  decrease: () => void;
}

export const CountButtons: React.FC<Props> = ({
  className,
  increase,
  decrease,
  quantity = 1,
}) => {
  return (
    <div className={cn("flex items-center gap-[7px]", className)}>
      <button
        onClick={increase}
        className="w-[30px] h-[30px] rounded-[10px] border border-accent flex items-center justify-center text-accent hover:bg-accent hover:text-light transition-color duration-200"
      >
        <Plus className="w-5 h-5" strokeWidth={2} />
      </button>

      <b>{quantity}</b>

      <button
        onClick={decrease}
        className="w-[30px] h-[30px] rounded-[10px] border border-accent flex items-center justify-center text-accent hover:bg-accent hover:text-light transition-color duration-200"
      >
        <Minus className="w-5 h-5" strokeWidth={2} />
      </button>
    </div>
  );
};
