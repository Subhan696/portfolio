import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-ivory/10 bg-ivory/[0.04] text-ivory/85 hover:bg-ivory/[0.08]",
        accent:
          "border-wine-500/40 bg-wine-600/15 text-wine-200 hover:bg-wine-600/25",
        wine: "border-wine-700/50 bg-wine-800/30 text-wine-200",
        navy: "border-ink-500/40 bg-ink-700/40 text-ivory/85",
        outline: "border-ivory/15 text-ivory/70",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
