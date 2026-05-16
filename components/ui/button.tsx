"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-ivory text-ink-900 hover:bg-parchment shadow-[0_10px_30px_-10px_rgba(243,238,230,0.35)]",
        accent:
          "relative text-ivory bg-gradient-to-r from-wine-500 via-wine-600 to-wine-800 bg-[length:200%_200%] hover:bg-[position:100%_0] shine font-medium tracking-wide shadow-[0_12px_40px_-12px_rgba(155,29,62,0.65)]",
        outline:
          "border border-wine-500/30 bg-ivory/[0.02] text-ivory hover:bg-wine-600/10 hover:border-wine-400/60 backdrop-blur",
        ghost: "text-ivory hover:bg-ivory/[0.06]",
        secondary:
          "bg-ink-700 text-ivory hover:bg-ink-600",
        link: "text-wine-300 underline-offset-4 hover:underline hover:text-wine-200",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
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
