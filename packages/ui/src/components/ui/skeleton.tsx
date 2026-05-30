import { cn } from "@frinosoft/config";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded bg-parchment-dark/60", className)}
      {...props}
    />
  );
}

export { Skeleton };
