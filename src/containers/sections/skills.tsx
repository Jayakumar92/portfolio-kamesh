/* eslint-disable react/no-array-index-key */
import { TECHNOLOGIES } from "@/utils/constants"
import Tag from "@/containers/data-display/tag"
import TechDetails from "@/containers/data-display/tech-details"
import Typography from "@/containers/general/typography"
import Container from "@/containers/layout/container"

const SkillsSection = () => {
  return (
    <Container id="skills">
      <div className="flex flex-col items-center gap-4">
        <div className="self-center">
          <Tag label="Skills" />
        </div>
        <Typography variant="subtitle" className="max-w-xl text-center">
          The skills, tools and technologies I am really good at:
        </Typography>
      </div>

      <div className="mx-auto grid grid-cols-1 space-x-7 sm:grid-cols-3 md:grid-cols-5">
        {TECHNOLOGIES.map((technology) => (
          <TechDetails {...technology} key={technology.id} />
        ))}
      </div>
    </Container>
  )
}

export default SkillsSection
