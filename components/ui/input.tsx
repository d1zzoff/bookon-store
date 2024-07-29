import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="rounded-[15px] h-[45px] w-full">
        <input
          type={type}
          autoComplete="off"
          className={cn(
            "h-10 w-full rounded-[12px] border border-grey-300 bg-base px-5 text-[16px] placeholder-grey-400 outline-none focus:shadow-base transition-all duration-200",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
