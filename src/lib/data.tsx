import { Github, Twitter, Figma, Linkedin } from "lucide-react"
import { ExperienceDetails, TechDetails, TMATERIAL } from "@/lib/types"
import {
  mitsuba,
  mm,
  montan,
  productDesign,
  qualityAssurance,
  pipeDesign,
  autoDesk,
  autoCad,
  solidEdge,
  nx,
  solidWorks,
} from "@/assets"

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
    icon: Linkedin,
    url: "https://www.linkedin.com/in/kamesh-ellappan-425b4349/",
  },
  {
    icon: Twitter,
    url: "",
  },
]

export const TECHNOLOGIES: TechDetails[] = [
  {
    label: "Autodesk Inventor 2019",
    logo: autoDesk,
  },
  {
    label: "AutoCAD Mechanical 2019",
    logo: autoCad,
  },
  {
    label: "Solid Edge 2020.",
    logo: solidEdge,
  },
  {
    label: "NX 10, Unigraphics",
    logo: nx,
  },
  {
    label: "Solid works 2019",
    logo: solidWorks,
  },
]

export const EXPERIENCES: ExperienceDetails[] = [
  {
    logo: montan,
    logoAlt: "Montan logo",
    position: "Montan Hydraulik India Private Limited",
    startDate: new Date(2021, 11),
    currentlyWorkHere: true,
    summary: [
      "Develop commissioning plans and schedules for hydraulic cylinder piping systems, collaborating with engineering and project management teams.",
      "Coordinate resources, equipment, and tools required for commissioning activities.",
      "Perform thorough inspections of hydraulic systems and conduct functional testing of components.",
      "Identify and troubleshoot operational issues during commissioning, resolving problems promptly.",
    ],
  },
  {
    logo: mm,
    darkModeLogo: "",
    logoAlt: "mem  logo",
    position: "MBM Engineering Infotech Limited",
    startDate: new Date(2016, 10),
    endDate: new Date(2020, 4),
    summary: [
      "Preparation of technical documentation, including reports, specifications, and design drawings.",
      "Preparation of monthly production report of various products with respective process and project, utilizing Min-Max Inventory control for production planning.",
      "Development of new patterns and molds for foundry process, while maintaining inventory management to ensure optimal stock levels.",
      "Monitoring of project progress in the shop floor, from initial process to delivery stage, along with production planning to meet customer requirements.",
    ],
  },
  {
    logo: mitsuba,
    darkModeLogo: "",
    logoAlt: "mitsuba logo",
    position: "Mitsuba Sical India Private Limited",
    startDate: new Date(2013, 7),
    endDate: new Date(2015, 11),
    summary: [
      "Conducted regular time and motion studies to identify bottlenecks, leading to the redesign of workflows for improvement productivity.",
      "Hands-on experience in the calculation and setup of machining processes",
      "Strong Knowledge about kaizen and 5S activities in machine shop floor.",
      "Utilized cause and effect analysis methodologies like Fish Bone Analysis to systematically identify and address root causes, ensuring comprehensive problem-solving.",
    ],
  },
]

export const MATERIALS: TMATERIAL[] = [
  {
    materialGrade: "MW450N",
    yieldStress: 420,
    tensileStress: 560,
    elongation: null,
  },
  {
    materialGrade: "E350, IS:2062 (St-52.3N)",
    yieldStress: 320,
    tensileStress: 490,
    elongation: null,
  },
  {
    materialGrade: "X15Cr16Ni2, IS 1570-5",
    yieldStress: 640,
    tensileStress: 830,
    elongation: null,
  },
  {
    materialGrade: "42CrMo4",
    yieldStress: 480,
    tensileStress: 640,
    elongation: null,
  },
  {
    materialGrade: "E355+SR, EN:10305-1 (St52BK+S)",
    yieldStress: 420,
    tensileStress: 580,
    elongation: null,
  },
  {
    materialGrade: "E355",
    yieldStress: 355,
    tensileStress: 490,
    elongation: "22%",
  },
  {
    materialGrade: "E355+C",
    yieldStress: 512,
    tensileStress: 640,
    elongation: "4%",
  },
  {
    materialGrade: "E355+LC",
    yieldStress: 406,
    tensileStress: 580,
    elongation: "7%",
  },
  {
    materialGrade: "E355+SR",
    yieldStress: 450,
    tensileStress: 580,
    elongation: "10%",
  },
  {
    materialGrade: "E355+A",
    yieldStress: 360,
    tensileStress: 450,
    elongation: "22%",
  },
  {
    materialGrade: "E355+N",
    yieldStress: 355,
    tensileStress: 490,
    elongation: "22%",
  },
  {
    materialGrade: "E355",
    yieldStress: 340,
    tensileStress: 580,
    elongation: "10%",
  },
]

export const END_CONDITIONS: { endCondition: string; value: number }[] = [
  {
    endCondition: "Both Ends are Hinged (Pivoted)",
    value: 1,
  },
  {
    endCondition: "Both Ends are Fixed",
    value: 4,
  },
  {
    endCondition: "One End Fixed and Other End Hinged",
    value: 2,
  },
  {
    endCondition: "One End Fixed and Other End Free",
    value: 0.25,
  },
  {
    endCondition: "Radial Gate, Hinged",
    value: 1,
  },
  {
    endCondition: "SFT, Fixed and Guided",
    value: 2,
  },
]
