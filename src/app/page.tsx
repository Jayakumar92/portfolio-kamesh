import Header from "@/containers/layout/header"
import AboutMeSection from "@/containers/sections/about-me"
import ContactSection from "@/containers/sections/contact"
import ExperienceSection from "@/containers/sections/experiences"
import HeroSection from "@/containers/sections/hero"
import SkillsSection from "@/containers/sections/skills"

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen w-full flex-col">
        <HeroSection />
        <AboutMeSection />
        <SkillsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
    </>
  )
}
