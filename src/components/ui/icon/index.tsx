"use client"

import { icons, LucideProps } from "lucide-react"

import { cn } from "@/components/utils"

type IconsName = keyof Omit<typeof icons, "createReactComponent">

type IconProps = {
  name: IconsName
} & LucideProps

const Icon = ({ name, className, ...props }: IconProps) => {
  const LucideIcon = icons[name]
  return <LucideIcon className={cn("h-4 w-4", className)} {...props} />
}

export { Icon, type IconProps, type IconsName }
