import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-lg border border-ivory/10 bg-ivory/[0.03] px-4 py-2 text-sm text-ivory placeholder:text-ivory/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wine-600/60 focus-visible:border-wine-600/40 transition-colors backdrop-blur",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
