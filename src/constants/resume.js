import { Github, Linkedin, Mail } from "lucide-react";

export const RESUME_DATA = {
  name: "Jihoo Park",
  title: "Data Scientist",
  initials: "JP",
  location: "Seoul, Korea",
  locationLink: "https://www.google.com/maps/place/Seoul",
  about:
    "Data Scientist focused on building products with extra attention to detail",
  summary:
    "Data Scientist with a background in Mathematics and extensive experience in web development. Specialized in building scalable data pipelines and machine learning models. Adept at bridging the gap between data science and software engineering to deliver robust solutions.",
  avatarUrl: "https://avatars.githubusercontent.com/u/67787453",
  personalWebsiteUrl: "https://park-jihoo.github.io",
  contact: {
    email: "wlgn8648@gmail.com",
    tel: null,
    social: [
      {
        name: "GitHub",
        url: "https://github.com/park-jihoo",
        icon: Github,
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/parkjihoo/",
        icon: Linkedin,
      },
      {
        name: "Email",
        url: "mailto:wlgn8648@gmail.com",
        icon: Mail,
      },
    ],
  },
  education: [
    {
      school: "Seoul National University",
      degree: "Master's in Data Science",
      start: "2022",
      end: "2024",
    },
    {
      school: "POSTECH",
      degree: "Bachelor's in Mathematics",
      start: "2016",
      end: "2020",
    },
  ],
  work: [
    {
      company: "LG CNS",
      link: "https://www.lgcns.com",
      badges: [],
      title: "Web Developer",
      start: "2020",
      end: "Present",
      description:
        "Developed and maintained large-scale enterprise web applications. Collaborated with cross-functional teams to deliver high-quality software solutions.",
    },
  ],
  skills: {
    "Machine Learning": ["TensorFlow", "PyTorch", "Scikit-learn"],
    "Data Engineering": ["MySQL", "PostgreSQL", "SQLite", "Kafka", "MongoDB"],
    Backend: ["Spring Boot", "Django", "FastAPI", "Flask"],
    Frontend: ["Vue.js", "React", "Next.js", "HTML", "CSS", "Vite"],
    Cloud: ["GCP", "AWS"],
    DevOps: ["Jenkins", "Docker", "GitHub Actions", "Git"],
    Languages: ["Python", "C++", "C", "Java", "R", "JavaScript", "MATLAB"],
    Tools: ["VS Code", "IntelliJ IDEA", "Eclipse"],
  },
  projects: [
    {
      title: "Portfolio Website",
      techStack: ["Next.js", "React", "Tailwind CSS", "Shadcn/UI"],
      description:
        "A personal portfolio website aimed at showcasing my career journey and technical skills. Built with modern web technologies for high performance and accessibility.",
      link: {
        label: "github.com",
        href: "https://github.com/park-jihoo/park-jihoo.github.io",
      },
    },
  ],
};
