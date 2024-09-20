/* eslint-disable react/no-array-index-key */
import { EXPERIENCES } from "@/utils/constants"
import ExperienceDetails from "@/containers/data-display/experience-details"
import Tag from "@/containers/data-display/tag"
import Typography from "@/containers/general/typography"
import Container from "@/containers/layout/container"

const ExperienceSection = () => {
  return (
    <Container className="bg-primary-50" id="experience">
      <div className="flex flex-col items-center gap-4">
        <div className="self-center">
          <Tag label="Experience" />
        </div>
        <Typography variant="subtitle" className="max-w-xl text-center">
          Here is a quick summary of my most recent experiences:
        </Typography>
      </div>

      {EXPERIENCES?.map((experience) => (
        <ExperienceDetails {...experience} key={experience.id} />
      ))}
    </Container>
  )
}

export default ExperienceSection
