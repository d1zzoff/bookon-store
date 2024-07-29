import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
  text: string;
  value: string;
  checked?: boolean;
  onClickCheckbox: () => void;
}

export const CheckboxItem: React.FC<Props> = ({
  className,
  text,
  value,
  checked,
  onClickCheckbox,
}) => {
  return (
    <div className={cn("flex items-center gap-[10px]", className)}>
      <Checkbox
        checked={checked}
        value={value}
        id={`checkbox-${value}`}
        onCheckedChange={onClickCheckbox}
      />
      <label
        htmlFor={`checkbox-${value}`}
        className="leading-none cursor-pointer flex-1"
      >
        {text}
      </label>
    </div>
  );
};
