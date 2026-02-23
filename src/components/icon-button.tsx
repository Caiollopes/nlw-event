import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";

export const iconButtonVariants = cva(
  "border border-white/10 rounded-md p-1.5 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      tone: {
        dark: "bg-black/20 ",
        light: "bg-white/10",
      },
    },
    defaultVariants: {
      tone: "light",
    },
  },
);

interface IconButtonProps
  extends ComponentProps<"button">, VariantProps<typeof iconButtonVariants> {}

export function IconButton({ tone, className, ...props }: IconButtonProps) {
  return (
    <button {...props} className={iconButtonVariants({ tone, className })} />
  );
}
