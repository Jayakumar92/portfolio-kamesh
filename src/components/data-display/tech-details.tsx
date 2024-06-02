"use client"

import { TechDetails as TTechDetails } from "@/lib/types"
import Typography from "@/components/general/typography"
import Link from "@/components/navigation/link"
import ImageWrapper from "@/components/data-display/image-wrapper"

const TechDetails = ({ logo, darkModeLogo, label }: TTechDetails) => {
  return (
    <div className="flex  w-fit flex-col items-center gap-2">
      <div className="flex h-[90px] items-center justify-center">
        <ImageWrapper
          src={logo}
          srcForDarkMode={darkModeLogo}
          alt={label}
          width={80}
          height={80}
          className="transition-transform duration-300 md:hover:scale-110"
        />
      </div>

      <Typography variant="body2">{label}</Typography>
    </div>
  )
}

export default TechDetails
