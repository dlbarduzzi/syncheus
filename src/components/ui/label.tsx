"use client"

import type { VariantProps } from "class-variance-authority"

import * as React from "react"
import * as RadixLabel from "@radix-ui/react-label"

import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"

const labelVariants = cva("text-sm font-medium leading-none text-gray-900")

const Label = React.forwardRef<
  React.ComponentRef<typeof RadixLabel.Root>,
  React.ComponentPropsWithoutRef<typeof RadixLabel.Root> &
  VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <RadixLabel.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
))

Label.displayName = RadixLabel.Root.displayName

export { Label }
