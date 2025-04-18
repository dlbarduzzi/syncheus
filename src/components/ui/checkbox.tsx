"use client"

import * as React from "react"
import * as RadixCheckbox from "@radix-ui/react-checkbox"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ComponentRef<typeof RadixCheckbox.Root>,
  React.ComponentPropsWithoutRef<typeof RadixCheckbox.Root>
>(({ className, ...props }, ref) => (
  <RadixCheckbox.Root
    ref={ref}
    className={cn(
      "peer size-5 shrink-0 rounded border border-gray-300 focus-visible:outline-none",
      "focus-visible:border-blue-400 focus-visible:ring-2",
      "focus-visible:ring-blue-200 focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:border-gray-900",
      "data-[state=checked]:bg-gray-900",
      "data-[state=checked]:focus-visible:border-gray-900",
      "data-[state=checked]:focus-visible:ring-gray-900",
      className,
    )}
    {...props}
  >
    <RadixCheckbox.Indicator
      className={cn("flex size-full items-center justify-center")}
    >
      <div className="size-full bg-[url(/images/checkbox-indicator.svg)]" />
    </RadixCheckbox.Indicator>
  </RadixCheckbox.Root>
))

Checkbox.displayName = RadixCheckbox.Root.displayName

export { Checkbox }
