import HeroSection from "@/components/sections/hero"
import ContactSection from "@/components/sections/contact"
import AboutMeSection from "@/components/sections/about-me"
import SkillsSection from "@/components/sections/skills"
import ExperienceSection from "@/components/sections/experiences"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

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
      {/* <Footer /> */}
    </>
  )
}
