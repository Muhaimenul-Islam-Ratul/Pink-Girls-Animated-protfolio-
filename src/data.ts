import { Education, ProjectRec, SkillCategory, Testimonial, Certification } from "./types";

export const profileBio = {
  name: "Monira Akter",
  title: "Machine Learning Researcher & Full-Stack Developer",
  subtitles: ["Programmer", "Coder", "Web Developer", "CSE Graduate"],
  email: "monira2002akter@gmail.com",
  phone: "+8801890350902",
  address: "Bhawar Vity, South Keraniganj, Abdullahpur-1311, Dhaka, Bangladesh",
  summary: "High-achieving Computer Science & Engineering graduate (CGPA: 3.90/4.00) with a strong foundation in theoretical computing, advanced mathematics, and software engineering. Possesses proven research and development experience in Artificial Intelligence, specializing in computer vision, deep learning models, and full-stack application integration. Highly skilled in translating academic concepts into functional, complex digital systems and eager to advance these technical competencies through rigorous graduate-level research.",
  avatarAlt: "Monira Akter Professional Illustrator Representation",
};

export const educations: Education[] = [
  {
    degree: "Bachelor of Science in Computer Science and Engineering (CSE)",
    institution: "Dhaka International University",
    duration: "2022 – 2025",
    grade: "CGPA – 3.90/4.00",
    details: [
      "Core Foundations: Extensive coursework in Data Structures, Algorithm Design, Object-Oriented Programming, Operating Systems, and Software Engineering.",
      "Mathematical & Research Competence: Strong grounding in Discrete Mathematics, Linear Algebra, and Statistical Methods.",
      "Capstone: Completed a 5-credit research thesis in Artificial Intelligence and Computer Vision."
    ]
  },
  {
    degree: "Higher Secondary Certificate (HSC), Science",
    institution: "Milestone College",
    duration: "2019 – 2021",
    grade: "GPA – 4.83/5.00",
    details: [
      "Completed Higher Secondary Certificate (HSC) in Science under the Dhaka Education Board.",
      "Achieved strong academic performance in Physics, Chemistry, Higher Mathematics, and ICT."
    ]
  },
  {
    degree: "Secondary School Certificate (SSC), Science",
    institution: "Baghapur High School",
    duration: "2017 – 2019",
    grade: "GPA – 4.83/5.00",
    details: [
      "Completed Secondary School Certificate (SSC) in Science under the Dhaka Education Board.",
      "Achieved strong academic performance in Mathematics, Physics, Chemistry, and ICT."
    ]
  }
];

export const competencies = [
  "Frontend Web Development",
  "Full-Stack Web Application Development",
  "Problem Solving & Programming Fundamentals",
  "Academic Research & Technical Documentation",
  "Responsive UI Development"
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    skills: ["C", "C++", "JavaScript", "Python", "TypeScript"]
  },
  {
    title: "Frontend Development",
    skills: ["HTML5", "CSS3", "Tailwind CSS", "Bootstrap", "React.js", "Vite"]
  },
  {
    title: "Backend & Databases",
    skills: ["Node.js", "Express.js", "MongoDB", "Next.js (Basic)", "JSON APIs"]
  },
  {
    title: "AI, ML & Research Tools",
    skills: ["TensorFlow", "YOLOv8", "OpenCV", "Image Segmentation", "Computer Vision"]
  },
  {
    title: "Platforms & Tools",
    skills: ["GitHub", "Git Version Control", "VS Code", "Vercel", "npm"]
  }
];

export const projects: ProjectRec[] = [
  {
    title: "Thesis: Guava Disease Classification, Detection and Segmentation",
    tagline: "Agricultural Deep Learning & Computer Vision System",
    description: "Developed and implemented an advanced deep learning framework using TensorFlow, YOLOv8, and OpenCV for modern mobile agricultural diagnosis on local leaves.",
    role: [
      "Participated in the implementation and integration of deep learning-based disease classification, detection and segmentation systems.",
      "Worked on AI model integration, web application development, and system deployment.",
      "Applied computer vision and image processing techniques for agricultural disease analysis.",
      "Contributed to responsive frontend integration and project documentation."
    ],
    technologies: ["TensorFlow", "YOLOv8", "OpenCV", "Python", "React.js", "Tailwind CSS"],
    category: "research",
    links: {
      thesis: "#",
      live: "https://guavavision.ai"
    }
  },
  {
    title: "Three Men Morris Game",
    tagline: "Classic Board Game Digitalization",
    description: "Developed a digital implementation of the classic board game Three Men Morris, featuring robust computational rules, intuitive mechanics, and interactive animation states.",
    role: [
      "Developed a digital implementation of the classic strategy game.",
      "Designed board game mechanics & user interaction system with high-speed response.",
      "Implemented responsive UI and game state check algorithms using Object Oriented concepts."
    ],
    technologies: ["JavaScript", "React.js", "Tailwind CSS", "Local State Store"],
    category: "game",
    links: {
      live: "#play-now"
    }
  }
];

export const certifications: Certification[] = [
  {
    name: "Artificial Intelligence & Computer Vision Specialization",
    issuer: "Global DeepLearning Academy",
    year: "2024"
  },
  {
    name: "Advanced Full-Stack Engineering Bootcamp",
    issuer: "Dhaka Tech Institute",
    year: "2023"
  },
  {
    name: "Academic Excellence Award (DIU CSE Dept)",
    issuer: "Dhaka International University",
    year: "2023"
  }
];

export const testimonials: Testimonial[] = [
  {
    quote: "Monira showed phenomenal aptitude during her Capstone Thesis. Her ability to synthesize complex neural networks with beautiful responsive user dashboards is rare. She has a bright future in Computer Vision research.",
    author: "Dr. Tanzila Islam",
    role: "Senior Thesis Advisor & Professor, CSE Dept",
    affiliation: "Dhaka International University"
  },
  {
    quote: "A remarkably disciplined and clean coder. Monira designed our game logic algorithms with 100% test coverage and styled it with precision. Her front-end translation skills are impeccable.",
    author: "Asif Mahmood",
    role: "Lead Systems Engineer",
    affiliation: "HexaDev Labs BD"
  }
];

export const hobbies = [
  "Technology Exploration",
  "Scientific Reading",
  "Traveling & Geographies",
  "Exploring Foreign Cultures",
  "Nature Hiking & Outdoors"
];
