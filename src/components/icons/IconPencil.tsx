import { cn } from "@/lib/utils"
import React from "react"

export type IconPencilProps = React.ComponentPropsWithoutRef<"svg">

export function IconPencil({ className, ...props }: IconPencilProps) {
  return (
    <svg
      {...props}
      className={cn("lucide lucide-square-pen", className)}
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z" />
    </svg>
  )
}
