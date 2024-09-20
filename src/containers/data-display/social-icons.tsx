"use client"

import { SOCIAL_LINKS } from "@/utils/constants"
import IconButton from "@/containers/general/icon-button"

const SocialIcons = () => {
  return (
    <div className="flex gap-1">
      {SOCIAL_LINKS.map((socialLink, index) => (
        <IconButton
          key={index}
          onClick={() => window.open(socialLink.url, "_blank")}
        >
          <socialLink.icon />
        </IconButton>
      ))}
    </div>
  )
}

export default SocialIcons
