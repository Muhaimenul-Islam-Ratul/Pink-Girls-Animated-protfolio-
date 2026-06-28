export interface Education {
  degree: string;
  institution: string;
  duration: string;
  grade: string;
  details: string[];
}

export interface ProjectRec {
  title: string;
  tagline: string;
  description: string;
  role: string[];
  technologies: string[];
  category: "research" | "web" | "game";
  links?: {
    thesis?: string;
    live?: string;
    github?: string;
  };
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  affiliation: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
}
