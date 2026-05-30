import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@frinosoft/config";

const badgeVariants = cva(
  "inline-flex items-center rounded px-2.5 py-0.5 text-xs font-display font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-crimson text-parchment",
        secondary: "bg-gold text-ink",
        outline: "border border-gold text-gold",
        success: "bg-green-700 text-parchment",
        warning: "bg-amber-600 text-parchment",
        danger: "bg-red-700 text-parchment",
      },
    },
    defaultVariants: {
      variant: "default",
    },
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
