import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@frinosoft/config";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded text-sm font-display font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-crimson text-parchment hover:bg-crimson-light shadow",
        secondary:
          "bg-gold text-ink hover:bg-gold-light shadow",
        outline:
          "border-2 border-gold text-gold hover:bg-gold hover:text-ink",
        ghost:
          "hover:bg-parchment-dark text-ink-light hover:text-ink",
        link: "text-gold underline-offset-4 hover:underline",
        destructive:
          "bg-red-700 text-white hover:bg-red-600",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded px-3",
        lg: "h-11 rounded px-8 text-lg",
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
