/* eslint-disable react/no-array-index-key */
"use client"

import { useRouter } from "next/navigation"

import { NAV_LINKS } from "@/utils/constants"
import { useScroll } from "@/hooks"
import { Button } from "@/components/ui/button"
import { cn } from "@/components/utils"
import Typography from "@/containers/general/typography"
import Link from "@/containers/navigation/link"

const Logo = () => (
  <Typography variant="h3" className="font-bold">
    {"Kamesh"}
  </Typography>
)

const Header = () => {
  const scrolled = useScroll(40)
  const router = useRouter()
  return (
    <header
      className={cn(
        "sticky top-0 z-30 w-full border-b border-transparent bg-gray max-md:border-gray-100",
        scrolled ? "bg-gray/50 backdrop-blur-xl md:border-gray-100" : ""
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between p-4 md:px-8">
        <Link href="/" noCustomization>
          <Logo />
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          <ul className="flex list-none items-center gap-6">
            {NAV_LINKS.map((link, index) => (
              <li key={index}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
          <div className="h-6 w-0.5 bg-gray-100"></div>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => {
                router.push("/hydraulic-calculations")
              }}
            >
              Hydraulic Calculations
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
