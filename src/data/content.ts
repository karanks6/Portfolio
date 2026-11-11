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
  role: "Software Developer",
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
      description: "Intelligent AI interior styling assistant that empowers users to effortlessly design and furnish their spaces. Features deep learning interior classification using EfficientNetV2 (89.95% accuracy), real-time YOLOv8 furniture and decor object detection, K-Means dominant color extraction, and ARCore augmented reality for interactive 3D in-room furniture preview.",
      stack: ["Flutter", "Dart", "Python", "FastAPI", "TensorFlow", "YOLOv8", "EfficientNetV2", "OpenCV", "scikit-learn", "Firebase", "ARCore"],
      githubUrl: "https://github.com/karanks6/DecorMatch-AI-Intelligent-Interior-Styling-Assistant"
    },
    {
      title: "CosmicVed",
      toolGroup: "flutter",
      description: "A beautifully designed, premium Flutter application bridging ancient Vedic astrological wisdom with modern software engineering. Engineered with deep astrological accuracy, privacy-first on-device computation, and refined aesthetics. Features an embedded Swiss Ephemeris (sweph) astronomical calculation engine, an offline Geonames planetary database, authentic Ashtakoota Guna Milan (36-point) Kundli compatibility matching, Chaldean numerology, and dynamic starfield physics.",
      stack: ["Flutter", "Dart", "Riverpod", "SQLite (SQFlite)", "Hive", "Swiss Ephemeris (sweph)", "GoRouter", "Freezed"],
      githubUrl: "https://github.com/karanks6/CosmicVed"
    }
  ],
  python: [
    {
      title: "Vistone",
      toolGroup: "python",
      description: "AI-powered personal color analysis web application that determines personal color palettes from a single portrait. Leverages a computer vision pipeline with MediaPipe Face Mesh for illumination correction and skin segmentation, Monk Skin Tone Scale (1–10) classification, and Gaussian Mixture Models (GMM) to output curated palettes of top 3 harmonized clothing colors to wear and 3 to avoid.",
      stack: ["Python", "FastAPI", "OpenCV", "MediaPipe", "scikit-learn (GMM)", "Colour Science (LAB)", "Vite", "Tailwind CSS"],
      githubUrl: "https://github.com/karanks6/Vistone-AI-Powered-Colour-Palette-Matcher",
      liveDemoUrl: "https://vistone.onrender.com/"
    }
  ],
  react: [
    {
      title: "Porsche 911 GT3 RS",
      toolGroup: "react",
      description: "An immersive, production-grade 3D automotive web experience centered on the Porsche 911 GT3 RS (992 generation). Built as a high-end digital showroom and interactive supercar configurator featuring real-time WebGL rendering, custom Three.js orbit and cinematic camera rigs, dynamic paint and livery customization, aerodynamic DRS animations, and simulated telemetry.",
      stack: ["React.js", "Three.js", "WebGL", "GLSL Shaders", "Tailwind CSS", "Vite", "3D Modeling"],
      githubUrl: "https://github.com/karanks6/Porsche_911_GT3_RS",
      liveDemoUrl: "https://porsche911gt3rs.vercel.app/"
    },
    {
      title: "PlanetEdu",
      toolGroup: "react",
      description: "High-performance, GPU-accelerated educational web experience featuring a cinematic planetary viewport. Delivers custom WebGL GLSL shaders, authentic Keplerian orbital mechanics, procedural atmospheric dynamics for terrestrial, gas, and ice giants, and an interactive scientific dossier terminal with real-time astronomical telemetry.",
      stack: ["React.js", "Three.js", "WebGL", "GLSL Shaders", "TypeScript", "Vite", "Keplerian Physics"],
      githubUrl: "https://github.com/karanks6/PlanetEdu",
      liveDemoUrl: "https://planet-edu-swart.vercel.app/"
    }
  ],
  nodejs: [
    {
      title: "iCar",
      toolGroup: "nodejs",
      description: "Full-stack MERN smart carpooling web application developed during internship at Softionik Solutions. Connects drivers and riders on common routes with interactive map scheduling, intelligent route-matching algorithms, instant booking, in-app chat, SOS emergency features, and an environmental dashboard tracking commute cost savings and CO2 reductions.",
      stack: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT", "Mapbox", "Socket.io", "REST API"],
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
