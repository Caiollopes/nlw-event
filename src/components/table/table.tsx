import type { ComponentProps } from "react";

interface TableProps extends ComponentProps<"table"> {}

export function Table({ className, children, ...props }: TableProps) {
  return (
    <div className="border border-white/10 rounded-lg">
      <table className="w-full" {...props}>
        {children}
      </table>
    </div>
  );
}
