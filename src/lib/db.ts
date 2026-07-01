import fs from 'fs';
import path from 'path';

export interface HeroData {
  words: string[];
  subWords: string[];
  sub: string;
  tech: string[];
}

export interface ServiceItem {
  id: string;
  icon: string;
  label: string;
  title: string;
  desc: string;
  tags: string[];
  accent: string;
  stat: string;
}

export interface ProjectItem {
  id: string;
  num: string;
  label: string;
  title: string;
  tagline: string;
  desc: string;
  image: string;
  images: string[];
  imageAlt: string;
  tags: string[];
  accent: string;
  accentRgb: string;
  year: string;
  role: string;
  link: string | null;
}

export interface AboutStat {
  value: string;
  label: string;
}

export interface AboutSkill {
  name: string;
  level: number;
}

export interface AboutData {
  title: string;
  bioParagraphs: string[];
  stats: AboutStat[];
  skills: AboutSkill[];
  floatingBadge: {
    icon: string;
    title: string;
    sub: string;
  };
}

export interface ContactData {
  email: string;
  phone: string;
  phoneDisplay: string;
}

export interface PortfolioData {
  hero: HeroData;
  services: ServiceItem[];
  projects: ProjectItem[];
  about: AboutData;
  contact: ContactData;
}

const DATA_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'portfolio.json');

// In case the file is missing/deleted, fallback to initial default state
const initialData: PortfolioData = {
  hero: {
    words: ["Engineering", "Digital", "Luxury."],
    subWords: ["Bridging", "the", "gap", "between", "high‑performance", "code", "and", "high‑fidelity", "design."],
    sub: "Full‑Stack Developer specializing in MERN architectures and immersive 3D web experiences.",
    "tech": ["React", "Next.js", "Node.js", "MongoDB", "Three.js", "TypeScript", "WebGL", "Express"]
  },
  services: [
    {
      id: "mern",
      icon: "⚡",
      label: "Core Engineering",
      title: "Full‑Stack MERN Development",
      desc: "End-to-end web applications built on MongoDB, Express.js, React, and Node.js. From scalable REST APIs to polished React UIs — delivered with production-grade architecture.",
      tags: ["MongoDB", "Express.js", "React", "Node.js", "Next.js", "REST APIs", "TypeScript"],
      accent: "neon",
      stat: "50+ Projects"
    },
    {
      id: "3d",
      icon: "◈",
      label: "Immersive Experiences",
      title: "3D Web & WebGL Engineering",
      desc: "Interactive 3D experiences powered by Three.js and React Three Fiber. Product configurators, immersive e-commerce, and WebGL-powered storytelling that converts visitors into buyers.",
      tags: ["Three.js", "React Three Fiber", "WebGL", "GSAP", "Shader Programming", "R3F Drei"],
      accent: "violet",
      stat: "WebGL Expert"
    },
    {
      id: "docs",
      icon: "◎",
      label: "Technical Leadership",
      title: "Software Documentation & Architecture",
      desc: "Comprehensive technical documentation, system design, and software specifications that bridge the gap between complex engineering and stakeholder clarity. Clear thinking, scalable systems.",
      tags: ["System Design", "API Docs", "SRS / BRD", "Tech Writing", "Architecture Diagrams", "Agile"],
      accent: "cyan",
      stat: "Tech Lead"
    }
  ],
  projects: [],
  about: {
    title: "Not just a developer. An engineer who ships.",
    bioParagraphs: [
      "I'm Abdullah Awais — a Full-Stack Developer specializing in building high-performance web applications that don't just function, they captivate."
    ],
    stats: [
      { "value": "3+", "label": "Years Experience" }
    ],
    skills: [
      { "name": "React / Next.js", "level": 95 },
      { "name": "Technical Writing", "level": 92 },
      { "name": "Meta Business Suite & Ads Manager", "level": 87 }
    ],
    floatingBadge: {
      icon: "◈",
      title: "Senior Engineer",
      sub: "Full‑Stack Developer"
    }
  },
  contact: {
    email: "abdullahawais034@gmail.com",
    phone: "923250995477",
    phoneDisplay: "0325 099 5477"
  }
};

export function getPortfolioData(): PortfolioData {
  try {
    if (!fs.existsSync(DATA_FILE_PATH)) {
      // Make directory if not exists
      const dir = path.dirname(DATA_FILE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(initialData, null, 2), 'utf8');
      return initialData;
    }
    const raw = fs.readFileSync(DATA_FILE_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error reading portfolio data:', error);
    return initialData;
  }
}

export async function writePortfolioData(data: PortfolioData): Promise<boolean> {
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing portfolio data:', error);
    return false;
  }
}
