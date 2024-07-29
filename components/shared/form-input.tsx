import React, { forwardRef } from "react";
import { Input } from "../ui";
import { cn } from "@/lib/utils";
import clsx from "clsx";

interface Props {
  className?: string;
  title?: string;
  error?: string | null;
}

export const FormInput = forwardRef<HTMLInputElement, Props>(
  ({ className, title, error, ...props }, ref) => {
    return (
      <div
        className={cn("w-full flex flex-col items-start gap-[10px]", className)}
      >
        {title && <p className="font-bold">{title}</p>}

        <Input ref={ref} className={clsx(error && "border-red")} {...props} />

        {error && <p className="text-red">{error}</p>}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
