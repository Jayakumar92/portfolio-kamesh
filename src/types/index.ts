import type { StaticImageData } from "next/image"

export type TMATERIAL = {
  materialGrade: string
  yieldStress: number
  tensileStress: number
  elongation: string | null
}

export type TechDetails = {
  logo: string | StaticImageData
  darkModeLogo?: string | StaticImageData
  label: string
  id: number
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
  id: number
}
