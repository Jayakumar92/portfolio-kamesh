import Image from "next/image"

import Tag from "@/components/data-display/tag"
import Container from "@/components/layout/container"
import Typography from "@/components/general/typography"
import Link from "@/components/navigation/link"

const AboutMeSection = () => {
  return (
    <Container className="bg-primary-50" id="about">
      <div className="self-center">
        <Tag label="About me" />
      </div>

      <div className="flex w-full flex-col justify-between gap-12 md:flex-row">
        {/* Content */}
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6">
          <Typography variant="h3">
            Curious about me? Here you have it:
          </Typography>
          <Typography>
            I am an accomplished Autonomy Mechanical Engineer with a decade of
            experience specializing in the manufacturing and design of
            mechanical parts.less transition from design to execution.
          </Typography>
          <Typography>
            My expertise lies in the application of Japanese technology within
            Manufacturing Organizations.
          </Typography>
          <Typography>
            I am very much a progressive thinker and enjoy working on products
            end to end, from ideation all the way to development. Adhere to
            company standards, I ensure alignment with organizational objectives
            and excellence in performance.
          </Typography>
          <Typography>
            Mechanical Design Expertise: Adept in designing, modelling, and
            drafting hydraulic cylinders and their components, I bring a
            profound understanding of mechanical design principles and
            manufacturability.
          </Typography>
          <Typography>Experience Across Diverse Domains.</Typography>
          <div className="flex flex-col gap-2 md:flex-row md:gap-6">
            <ul className="flex list-inside list-disc flex-col gap-2">
              <Typography component="li">Machine Shop Floor</Typography>
              <Typography component="li">Foundry Operations</Typography>
            </ul>
            <ul className="flex list-inside list-disc flex-col gap-2">
              <Typography component="li">High-Pressure Die Casting</Typography>
              <Typography component="li">Automobile Assembly Plants</Typography>
            </ul>
          </div>
          <Typography>
            Manufacturing Collaboration: I work closely with manufacturing
            teams, providing support throughout the production process to ensure
            the seam
          </Typography>
        </div>
      </div>
    </Container>
  )
}

export default AboutMeSection
