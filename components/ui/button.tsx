import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "flex gap-[5px] items-center justify-center whitespace-nowrap rounded-[15px] font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "text-light bg-accent text-light hover:bg-accent/90",
        destructive: "bg-red cursor-inherit text-light hover:bg-red-500/90",
        outline:
          "fill-accent border border-accent text-accent bg-none hover:bg-accent hover:fill-light hover:text-light",
      },
      size: {
        full: "w-full h-[45px] px-[15px]",
        default: "h-[45px] px-[15px]",
        sm: "[45px] px-[10px]",
        lg: "h-[50px] px-[50px]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
