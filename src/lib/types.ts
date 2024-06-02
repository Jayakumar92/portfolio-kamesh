import type { StaticImageData } from "next/image"

export type TechDetails = {
  logo: string | StaticImageData
  darkModeLogo?: string | StaticImageData
  label: string
}

export type ExperienceDetails = {
  logo: string | StaticImageData
  darkModeLogo?: string | StaticImageData
  logoAlt: string
  position: string
  currentlyWorkHere?: boolean
  startDate: Date
  endDate?: Date
  summary: string[]
}
