import React from "react"
import { tv, VariantProps } from "tailwind-variants"

export const buttonVariants = tv(
  {
    base: "h-9 px-4 text-white text-sm disabled:cursor-not-allowed",
    variants: {
      size: {
        default: "",
        icon: "h-6 w-6 p-0 grid place-items-center",
      },
      variant: {
        default: "",
        "todo-list": "h-9 w-full",
      },
      color: {
        amber: "bg-amber-600 hover:bg-amber-700 disabled:bg-amber-800",
        rose: "bg-rose-600 hover:bg-rose-700 disabled:bg-rose-800",
        destructive: "bg-red-500 hover:bg-red-600 disabled:bg-red-700",
      },
    },
    defaultVariants: {
      variant: "default",
      color: "amber",
    },
  },
  {
    responsiveVariants: true,
  },
)

export type ButtonProps = React.ComponentPropsWithoutRef<"button"> & VariantProps<typeof buttonVariants> & {}

export const Button = React.forwardRef<React.ElementRef<"button">, ButtonProps>(function ButtonComponent(
  { size, color, variant, className, ...props },
  ref,
) {
  return (
    <button
      {...props}
      className={buttonVariants({ size, color, variant, className })}
      ref={ref}
    />
  )
})

Button.displayName = "Button"
