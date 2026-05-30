import * as React from "react";
import { cn } from "@frinosoft/config";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded border-2 border-parchment-dark bg-parchment px-3 py-2 text-sm font-body text-ink placeholder:text-ink-light/50 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 disabled:cursor-not-allowed disabled:opacity-50",
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
