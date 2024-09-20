"use client"

import React from "react"

import { useNavigation } from "@/hooks"
import { ButtonWithIcon } from "@/components/ui/button"

type BackProps = {
  children?: React.ReactNode
}

function Back({ children = "Back" }: BackProps) {
  const { back } = useNavigation()
  return (
    <div>
      <ButtonWithIcon
        className="m-0 p-0 text-xs text-muted-foreground"
        variant={"link"}
        iconProps={{
          name: "ArrowLeft",
          className: "h-3 w-3",
        }}
        onClick={() => {
          back()
        }}
      >
        {children}
      </ButtonWithIcon>
    </div>
  )
}

export { Back }
