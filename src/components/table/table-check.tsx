import type { ComponentProps } from "react";

interface TableCheckProps extends ComponentProps<"input"> {}

export function TableCheck({ className, ...props }: TableCheckProps) {
  return (
    <input
      type="checkbox"
      className="size-4 focus:ring-0 bg-black/20 rounded border-white/10 checked:bg-orange-400 cursor-pointer"
      {...props}
    />
  );
}
