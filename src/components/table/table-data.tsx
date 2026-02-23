import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface TableDataProps extends ComponentProps<"td"> {}

export function TableData({ children, className, ...props }: TableDataProps) {
  return (
    <td
      className={twMerge("py-3 px-4 text-sm text-zinc-300", className)}
      {...props}
    >
      {children}
    </td>
  );
}
