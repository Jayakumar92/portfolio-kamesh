"use client"

import * as React from "react"

import { Icon } from "@/components/ui/icon"
import { cn } from "@/components/utils"

export type InputPasswordProps = React.InputHTMLAttributes<HTMLInputElement>

const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ className, ...props }, ref) => {
    const [show, setShow] = React.useState(false)
    return (
      <div className="relative w-full">
        <input
          type={show ? "text" : "password"}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        <div
          className="absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer p-2"
          onClick={() => setShow((prev) => !prev)}
        >
          <Icon
            name={show ? "Eye" : "EyeOff"}
            className="h-4 w-4 text-muted-foreground"
          />
        </div>
      </div>
    )
  }
)
InputPassword.displayName = "Input"

export { InputPassword }
