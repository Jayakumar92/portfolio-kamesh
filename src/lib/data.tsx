import { Github, Twitter, Figma } from "lucide-react"
import { ExperienceDetails, TechDetails } from "@/lib/types"

export const EXTERNAL_LINKS = {
  GITHUB: "https://github.com/shahsagarm",
  GITHUB_REPO: "https://github.com/shahsagarm/sagarshah.dev",
  TWITTER: "https://twitter.com/shahsagarm",
  FIGMA: "https://www.figma.com/@shahsagarm",
  FIGMA_FILE:
    "https://www.figma.com/community/file/1262992249991763120/Personal-Portfolio-Website-Template-%7C-Mobile-%26-Desktop",
}

export const NAV_LINKS = [
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Skill",
    href: "#skills",
  },
  {
    label: "Experience",
    href: "#experience",
  },
  {
    label: "Contact",
    href: "#contact",
  },
]

export const SOCIAL_LINKS = [
  {
    icon: Github,
    url: "https://github.com/shahsagarm",
  },
  {
    icon: Twitter,
    url: "https://twitter.com/shahsagarm",
  },
]

export const TECHNOLOGIES: TechDetails[] = [
  {
    label: "Javascript",
    logo: "",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
]

export const EXPERIENCES: ExperienceDetails[] = [
  {
    logo: "",
    logoAlt: "Upwork logo",
    position: "Independent Freelancer",
    startDate: new Date(2021, 10),
    currentlyWorkHere: true,
    summary: [
      "Worked for various clients like Fiskil, Shosho, Crowe MacKay LLP.",
      "Worked with a variety of technologies, including React, Next.js, Typescript, Express.js, PostgreSQL, Tailwindcss, Mui, Firebase, Storybook, Cypress, and others.",
    ],
  },
  {
    logo: "",
    darkModeLogo: "",
    logoAlt: "Greenapex logo",
    position: "Team Lead",
    startDate: new Date(2017, 6),
    endDate: new Date(2021, 9),
    summary: [
      "Acted as team lead in different projects.",
      "Brainstormed new ideas & gathered requirements for internal projects.",
      "Designed architecture of different projects (frontend + backend).",
      "Worked on enterprise-level projects for a variety of clients.",
      "Handled sprint planning & task distribution.",
    ],
  },
  {
    logo: "",
    darkModeLogo: "",
    logoAlt: "Dotnpixel logo",
    position: "Full Stack Developer",
    startDate: new Date(2015, 11),
    endDate: new Date(2017, 4),
    summary: ["Worked as a full stack developer (React / Laravel)."],
  },
]
