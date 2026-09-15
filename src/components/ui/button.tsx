import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[transform,background-color,color,box-shadow,opacity] duration-150 ease-out active:not-disabled:scale-[0.96] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper",
  {
    variants: {
      variant: {
        copper: "bg-copper text-cream hover:bg-copper-dim",
        ink: "bg-ink text-cream hover:bg-ink-soft",
        ghost: "bg-transparent text-ink hover:bg-ink/6",
        outline: "bg-cream text-ink shadow-[var(--shadow-paper)] hover:bg-paper",
        chalk: "bg-chalk/15 text-chalk hover:bg-chalk/25",
        chalkSolid: "bg-chalk text-board hover:bg-cream",
      },
      size: {
        sm: "min-h-10 px-3.5 text-sm",
        md: "min-h-11 px-5 text-sm",
        lg: "min-h-12 px-6 text-base",
      },
    },
    defaultVariants: { variant: "copper", size: "md" },
  },
);

type Props = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, type = "button", ...props }: Props) {
  return (
    <button type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
