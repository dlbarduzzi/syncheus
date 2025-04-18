import type { VariantProps } from "class-variance-authority"

import * as React from "react"

import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"

const inputVariants = cva(
  `flex h-10 w-full items-center rounded-md border bg-white px-3 py-5 text-sm
  text-gray-900 placeholder:text-gray-400 focus-visible:outline-none
  focus-visible:ring-2 disabled:cursor-not-allowed disabled:border-gray-200
  disabled:bg-gray-50 disabled:text-gray-400`,
  {
    variants: {
      variant: {
        default:
          "border-gray-300 focus-visible:border-blue-400 focus-visible:ring-blue-200",
        danger:
          "border-red-400 focus-visible:border-red-400 focus-visible:ring-red-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

type InputProps = React.ComponentProps<"input"> & VariantProps<typeof inputVariants>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)

Input.displayName = "Input"

export { Input }
