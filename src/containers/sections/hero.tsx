import Image from "next/image"
import { MapPin } from "lucide-react"

import { user } from "@/assets/images"
import SocialIcons from "@/containers/data-display/social-icons"
import Typography from "@/containers/general/typography"
import Container from "@/containers/layout/container"

const HeroSection = () => {
  return (
    <Container id="hero">
      <div className="flex flex-col gap-12 md:flex-row">
        <div className="flex items-center justify-center md:order-last md:flex-grow md:justify-end">
          <div className="relative h-[300px] w-[280px] md:h-[360px] md:w-[320px]">
            <Image
              src={user}
              alt="Headshot of Sagar"
              className="border-gray absolute z-10 h-[280px] w-[240px] border-8 max-md:left-5 md:left-0 md:top-0 md:h-[320px] md:w-[280px]"
              style={{ objectFit: "cover" }}
            ></Image>
            <div className="bg-primary-200 absolute h-[280px] w-[280px] border-8 border-transparent max-md:top-5 md:bottom-0 md:right-0 md:h-[320px] md:w-[280px]"></div>
          </div>
        </div>

        <div className="flex max-w-3xl flex-grow flex-col justify-center gap-8 md:order-first md:items-start md:justify-center 2xl:gap-12">
          <div className="flex flex-col gap-2">
            <Typography variant="h1">Hi, Im kamesh</Typography>
            <Typography>
              Im a mechanical engineer specializing in hydraulic cylinder design
              and manufacturing. I focus on creating exceptional mechanical
              solutions that are efficient, reliable, and visually appealing,
              drawing from years of experience in the field.
            </Typography>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex gap-2">
              <MapPin className="stroke-gray-600" />
              <Typography>Chennai, India</Typography>
            </div>
            <SocialIcons />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default HeroSection
