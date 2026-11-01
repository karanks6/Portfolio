export interface Project {
  title: string;
  toolGroup: 'flutter' | 'python' | 'react' | 'nodejs';
  description?: string;
  stack?: string[];
  githubUrl: string;
  liveDemoUrl?: string;
}

export interface TimelineEntry {
  period: string;
  title: string;
  institution: string;
  description?: string;
}

export const PERSONAL_INFO = {
  name: "Karan S Suvarna",
  role: "Flutter + AI Builder",
  subtitle: "MCA graduate focused on software development, backend development, and AI-powered applications.",
  location: "Mangalore, Karnataka, India",
  email: "suvarnakaran77@gmail.com",
  socials: {
    github: "https://github.com/karanks6",
    linkedin: "https://www.linkedin.com/in/karan-suvarna-5a0426291/",
    instagram: "https://www.instagram.com/_karan_suvarna_?exln=dHo4NGF2aWcyNDNu",
    resume: "/portfolio/assets/Resume.pdf"
  },
  about: "MCA graduate focused on scalable, efficient software development, robust backend architectures, and AI-powered applications. Passionate about crafting intuitive user experiences and engineering high-performance systems from concept to deployment."
};

export const TIMELINE: TimelineEntry[] = [
  {
    period: "2021 — 2024",
    title: "Bachelor of Computer Applications (BCA)",
    institution: "Canara Degree College",
    description: "Foundational studies in computer science, software engineering principles, algorithm design, and modern database systems."
  },
  {
    period: "2024 — 2026",
    title: "Master of Computer Applications (MCA)",
    institution: "N.M.A.M. Institute of Technology, Nitte",
    description: "Advanced computing, machine learning, distributed architectures, intelligent systems, and enterprise software engineering."
  },
  {
    period: "Feb — May 2026",
    title: "Software Developer Intern",
    institution: "Softionik Solutions (OPC) Pvt. Ltd.",
    description: "Full-stack MERN application development, frontend engineering, backend services, API design, database integration, SDLC practices, automated testing, and CI/CD deployment workflows."
  }
];

export const PROJECTS: Record<'flutter' | 'python' | 'react' | 'nodejs', Project[]> = {
  flutter: [
    {
      title: "DecorMatch AI",
      toolGroup: "flutter",
      description: "AI interior styling assistant. Analyses room images and recommends furniture and decor. EfficientNetV2 interior classification at 89.95% accuracy, YOLOv8 object detection, K-Means dominant colour extraction, ARCore 3D furniture preview.",
      stack: ["Flutter", "Dart", "Python", "FastAPI", "Node.js", "TensorFlow", "YOLOv8", "EfficientNetV2", "OpenCV", "scikit-learn", "Firebase", "ARCore"],
      githubUrl: "https://github.com/karanks6/DecorMatch-AI-Intelligent-Interior-Styling-Assistant"
    },
    {
      title: "CosmicVed",
      toolGroup: "flutter",
      githubUrl: "https://github.com/karanks6/CosmicVed"
    }
  ],
  python: [
    {
      title: "Vistone",
      toolGroup: "python",
      description: "AI-powered colour palette matcher. Determines Monk Skin Tone (1-10) and undertone (Warm, Cool, Neutral). MediaPipe Face Mesh facial-region masking, illumination correction, LAB colour analysis, Gaussian Mixture Models, JSON-based recommendations: top 3 colours to use and top 3 to avoid.",
      stack: ["Python", "OpenCV", "MediaPipe", "scikit-learn (GMM)", "Colour Science (LAB)", "Image Processing"],
      githubUrl: "https://github.com/karanks6/Vistone-AI-Powered-Colour-Palette-Matcher",
      liveDemoUrl: "https://vistone.onrender.com/"
    }
  ],
  react: [
    {
      title: "Porsche 911 GT3 RS",
      toolGroup: "react",
      description: "3D experience / model viewer project.",
      githubUrl: "https://github.com/karanks6/Porsche_911_GT3_RS",
      liveDemoUrl: "https://porsche911gt3rs.vercel.app/"
    },
    {
      title: "PlanetEdu",
      toolGroup: "react",
      githubUrl: "https://github.com/karanks6/PlanetEdu",
      liveDemoUrl: "https://planet-edu-swart.vercel.app/"
    }
  ],
  nodejs: [
    {
      title: "iCar",
      toolGroup: "nodejs",
      description: "Smart carpooling web application, internship project. Offer, search and book carpool rides, smart ride matching, in-app chat, cost-saving and environmental dashboards.",
      stack: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT"],
      githubUrl: "https://github.com/karanks6/iCar-Smart-Carpooling-Web-Application",
      liveDemoUrl: "https://icar-smart-carpooling-web-application.onrender.com/"
    }
  ]
};

export const SKILLS = {
  languages: ["Python", "Java", "JavaScript", "C", "SQL"],
  frameworks: ["Flask", "Node.js", "React.js", "Flutter", "Spring Boot", "HTML", "CSS"],
  databases: ["MongoDB", "MySQL", "Firebase"]
};
