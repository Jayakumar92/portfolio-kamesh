/* eslint-disable react/no-array-index-key */
"use client"

import { useRouter } from "next/navigation"

import { NAV_LINKS } from "@/utils/constants"
import { useScroll } from "@/hooks"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
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
        <div className="flex items-center gap-3 md:gap-6">
          <ul className="hidden list-none items-center gap-6 md:flex">
            {NAV_LINKS.map((link, index) => (
              <li key={index}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>

          <div className="hidden h-6 w-0.5 bg-gray-100 md:flex"></div>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => {
                router.push("/hydraulic-calculations")
              }}
              size={"sm"}
            >
              Hydraulic Calculations
            </Button>
          </div>
          <div className="flex md:hidden">
            <Sheet>
              <SheetTrigger>
                <Button variant={"ghost"} onClick={() => {}} size={"sm"}>
                  <Icon name="Menu" className="cursor-pointer" />
                </Button>
              </SheetTrigger>
              <SheetContent className="max-w-96">
                <ul className="mt-8 flex flex-col items-center justify-center space-y-6">
                  {NAV_LINKS.map((link, index) => (
                    <li key={index}>
                      <Link
                        className="text-base font-medium text-gray-800 hover:underline hover:underline-offset-2"
                        href={link.href}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
