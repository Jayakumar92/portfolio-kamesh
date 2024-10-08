import { ExperienceDetails, TechDetails, TMATERIAL } from "@/types"
import { Linkedin, Twitter } from "lucide-react"

import {
  autoCad,
  autoDesk,
  mitsuba,
  mm,
  montan,
  nx,
  solidEdge,
  solidWorks,
} from "@/assets/images"

export const ERRORS = {
  SOMETHING_WENT_WRONG: "Something went wrong, please try again later",
  INVALID_REQUEST: "Invalid Request",
}

/**
 * mobile sidenav list
 */

export const MOBILE_NAV = [
  { id: 1, title: "Home" },
  { id: 2, title: "Party" },
  { id: 3, title: "Media" },
  { id: 4, title: "Contact" },
]

export const HOME_CAROUSELS = [
  {
    id: 1,
    title: "Serene Nature Scene with Sunlight Streaming Through Trees",
    image:
      "https://cdn.pixabay.com/photo/2013/10/02/23/03/mountains-190055_1280.jpg",
  },
  {
    id: 2,
    title: "Tranquil Beach with Gentle Waves and Clear Blue Sky",
    image: "https://cdn.pixabay.com/photo/2013/07/18/20/26/sea-164989_1280.jpg",
  },
  {
    id: 3,
    title: "Lush Forest Scene with Rays of Sunlight Peeking Through",
    image:
      "https://cdn.pixabay.com/photo/2013/10/02/23/03/mountains-190055_1280.jpg",
  },
]

export const POLICES = [
  {
    id: 1,
    title: "IMAGINE",
    description:
      "Imagine yourself contributing to a world filled with healthy social infrastructure. Dreams and ambitions are central to the first step. We help you with the first outline of your idea. Together we turn dreams into goals.",
  },
  {
    id: 2,
    title: "NAVIGATE",
    description:
      "Navigate through your community to ensure your project brings about the intended results. Discovery and understanding are central to the second step. We explore society and discover how your idea fits into it. Together we hear the beating heart of a society.",
  },
  {
    id: 3,
    title: "POSITION",
    description:
      "Positioning your project means finding your purpose and niche. Focus and choices are central to the third step. We create focus by formulating the why of your project. Together, we determine your project’s guiding star.",
  },
  {
    id: 4,
    title: "ARTIFY",
    description:
      "Artify makes your project both memorable and a place to make memories. Designing and defining is the focus of the fourth step. We bring your project to life in sketches and designs. Together, we refine the proposals into a concrete plan.",
  },
  {
    id: 5,
    title: "CONSTRUCT",
    description:
      "Construct the place that will shape your society. Making and monitoring are central to the fifth step. We help you realize the project we've been working toward together. From the foundation stone to the opening, we guide the entire process.",
  },
  {
    id: 6,
    title: "TEST",
    description:
      "Test to see if the proof is in the pudding. Monitoring and learning are central to the sixth step. We examine whether dreams have been fulfilled, goals achieved and needs met. By continuing to learn, we continue to improve.",
  },
]

export const END_CONDITIONS: {
  id: string
  endCondition: string
  value: string
}[] = [
  {
    id: "1",
    endCondition: "Both Ends are Hinged (Pivoted)",
    value: "1",
  },
  {
    id: "2",
    endCondition: "Both Ends are Fixed",
    value: "4",
  },
  {
    id: "3",
    endCondition: "One End Fixed and Other End Hinged",
    value: "2",
  },
  {
    id: "4",
    endCondition: "One End Fixed and Other End Free",
    value: "0.25",
  },
  {
    id: "5",
    endCondition: "Radial Gate, Hinged",
    value: "1",
  },
  {
    id: "6",
    endCondition: "SFT, Fixed and Guided",
    value: "2",
  },
]
export const MATERIALS: TMATERIAL[] = [
  {
    material: "Carbon Steel",
    standard: "IS:1570-2",
    materialGrade: "45C8",
    yieldStress: 380,
    tensileStress: 600,
    elongation: "17",
  },
  {
    material: "Carbon Steel",
    standard: "DIN",
    materialGrade: "C45",
    yieldStress: 380,
    tensileStress: 600,
    elongation: "17",
  },
  {
    material: "Carbon Steel",
    standard: "EN 10267",
    materialGrade: "38MnV6",
    yieldStress: 520,
    tensileStress: 800,
    elongation: "12",
  },
  {
    material: "Carbon Steel",
    standard: "EN",
    materialGrade: "En8",
    yieldStress: 380,
    tensileStress: 600,
    elongation: "17",
  },
  {
    material: "Carbon Steel",
    standard: "ASTM A108",
    materialGrade: "Gr.1040",
    yieldStress: 380,
    tensileStress: 600,
    elongation: "17",
  },
  {
    material: "Carbon Steel",
    standard: "SAE",
    materialGrade: "SAE 1045",
    yieldStress: 380,
    tensileStress: 600,
    elongation: "17",
  },
  {
    material: "Carbon Steel",
    standard: "SAE",
    materialGrade: "SAE 1018",
    yieldStress: 380,
    tensileStress: 600,
    elongation: "17",
  },
  {
    material: "Alloy Steel",
    standard: "IS:1570-4",
    materialGrade: "42CrMo4",
    yieldStress: 480,
    tensileStress: 640,
    elongation: "12",
  },
  {
    material: "Alloy Steel",
    standard: "EN 10250-3",
    materialGrade: "42CrMo4",
    yieldStress: 480,
    tensileStress: 640,
    elongation: "12",
  },
  {
    material: "Alloy Steel",
    standard: "BS 970",
    materialGrade: "En19",
    yieldStress: 480,
    tensileStress: 640,
    elongation: "12",
  },
  {
    material: "Alloy Steel",
    standard: "SAE",
    materialGrade: "SAE 4140",
    yieldStress: 480,
    tensileStress: 640,
    elongation: "12",
  },
  {
    material: "Alloy Steel",
    standard: "EN10210-1",
    materialGrade: "S355J2H",
    yieldStress: 480,
    tensileStress: 640,
    elongation: "12",
  },
  {
    material: "Alloy Steel",
    standard: "EN",
    materialGrade: "MW450N",
    yieldStress: 420,
    tensileStress: 560,
    elongation: "12",
  },
  {
    material: "Alloy Steel",
    standard: "EN",
    materialGrade: "20MnV6",
    yieldStress: 420,
    tensileStress: 560,
    elongation: "12",
  },
  {
    material: "Mild Steel",
    standard: "IS:2062",
    materialGrade: "E350,(St-52.3N)",
    yieldStress: 320,
    tensileStress: 490,
    elongation: "10",
  },
  {
    material: "Mild Steel",
    standard: "EN:10305-1",
    materialGrade: "E355+SR,(St52BK+S)",
    yieldStress: 420,
    tensileStress: 580,
    elongation: "10",
  },
  {
    material: "Mild Steel",
    standard: "EN:10305-1",
    materialGrade: "E355",
    yieldStress: 355,
    tensileStress: 490,
    elongation: "22",
  },
  {
    material: "Mild Steel",
    standard: "EN:10305-1",
    materialGrade: "E355+C",
    yieldStress: 512,
    tensileStress: 640,
    elongation: "4",
  },
  {
    material: "Mild Steel",
    standard: "EN:10305-1",
    materialGrade: "E355+LC",
    yieldStress: 406,
    tensileStress: 580,
    elongation: "7",
  },
  {
    material: "Mild Steel",
    standard: "EN:10305-1",
    materialGrade: "E355+SR",
    yieldStress: 450,
    tensileStress: 580,
    elongation: "",
  },
  {
    material: "Mild Steel",
    standard: "EN:10305-1",
    materialGrade: "E355+A",
    yieldStress: 360,
    tensileStress: 450,
    elongation: "22",
  },
  {
    material: "Mild Steel",
    standard: "EN:10305-1",
    materialGrade: "E355+N",
    yieldStress: 355,
    tensileStress: 490,
    elongation: "22",
  },
  {
    material: "Mild Steel",
    standard: "EN:10305-1",
    materialGrade: "E355-1",
    yieldStress: 340,
    tensileStress: 580,
    elongation: "10",
  },
  {
    material: "Stainless Steel",
    standard: "IS 1570-5",
    materialGrade: "X12Cr12 , SS 410",
    yieldStress: 410,
    tensileStress: 590,
    elongation: "16",
  },
  {
    material: "Stainless Steel",
    standard: "IS 1570-5",
    materialGrade: "X20Cr13 , SS420 S1",
    yieldStress: 490,
    tensileStress: 590,
    elongation: "14",
  },
  {
    material: "Stainless Steel",
    standard: "IS 1570-5",
    materialGrade: "X30Cr13 , SS420 S2",
    yieldStress: 590,
    tensileStress: 640,
    elongation: "11",
  },
  {
    material: "Stainless Steel",
    standard: "IS 1570-5",
    materialGrade: "X15Cr16Ni2 , SS431",
    yieldStress: 640,
    tensileStress: 830,
    elongation: "10",
  },
  {
    material: "Stainless Steel",
    standard: "IS 1570-5",
    materialGrade: "X04Cr17Nil2M02 , SS 316",
    yieldStress: 207,
    tensileStress: 517,
    elongation: "40",
  },
  {
    material: "Stainless Steel",
    standard: "IS 1570-5",
    materialGrade: "X02Cr17Nil2M02 , SS 316L",
    yieldStress: 207,
    tensileStress: 517,
    elongation: "40",
  },
  {
    material: "Stainless Steel",
    standard: "IS 1570-5",
    materialGrade: "X04Cr19Ni9 , SS 304 S1",
    yieldStress: 207,
    tensileStress: 517,
    elongation: "40",
  },
  {
    material: "Stainless Steel",
    standard: "IS 1570-5",
    materialGrade: "X02Cr19Ni9 , SS 304 S2",
    yieldStress: 172,
    tensileStress: 483,
    elongation: "40",
  },
  {
    material: "Ductile Iron",
    standard: "IS 1865",
    materialGrade: "SG 400/15",
    yieldStress: 250,
    tensileStress: 400,
    elongation: "15",
  },
  {
    material: "Ductile Iron",
    standard: "IS 1865",
    materialGrade: "SG 450/10",
    yieldStress: 310,
    tensileStress: 450,
    elongation: "10",
  },
  {
    material: "Ductile Iron",
    standard: "IS 1865",
    materialGrade: "SG 500/7",
    yieldStress: 320,
    tensileStress: 500,
    elongation: "7",
  },
  {
    material: "Ductile Iron",
    standard: "IS 1865",
    materialGrade: "SG 600/3",
    yieldStress: 370,
    tensileStress: 600,
    elongation: "3",
  },
]

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

export const EXPERIENCES: ExperienceDetails[] = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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

export const TECHNOLOGIES: TechDetails[] = [
  {
    id: 1,
    label: "Autodesk Inventor 2019",
    logo: autoDesk,
  },
  {
    id: 2,
    label: "AutoCAD Mechanical 2019",
    logo: autoCad,
  },
  {
    id: 3,
    label: "Solid Edge 2020.",
    logo: solidEdge,
  },
  {
    id: 4,
    label: "NX 10, Unigraphics",
    logo: nx,
  },
  {
    id: 5,
    label: "Solid works 2019",
    logo: solidWorks,
  },
]
