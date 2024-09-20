"use client"

import * as React from "react"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import { ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"

const CoreCollapsible = CollapsiblePrimitive.Root
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

type CollapsibleProps = {
  title: string
  children: React.ReactNode
} & CollapsiblePrimitive.CollapsibleProps

function Collapsible({ title, children, ...props }: CollapsibleProps) {
  return (
    <CoreCollapsible {...props}>
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">{title}</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2 py-3">
        {children}
      </CollapsibleContent>
    </CoreCollapsible>
  )
}

export { Collapsible }
