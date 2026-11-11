# 🌐 Karan S Suvarna — 3D Interactive Portfolio

[![Live Demo](https://img.shields.io/badge/Live%20Demo-aboutkaran.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://aboutkaran.vercel.app/)
[![React](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)

> A high-performance, immersive 3D developer portfolio engineered with React, Three.js, React Three Fiber, and custom GLSL shaders. Features real-time 3D model choreography synchronized with scroll physics, dynamic 2D screen-projected hotspots, horizontal works gallery, and dark glassmorphic UI.

---

## 🔗 Live Website

Explore the live interactive experience here:  
👉 **[https://aboutkaran.vercel.app/](https://aboutkaran.vercel.app/)**

---

## 📸 Key Highlights & Features

- **🎭 Interactive 3D Model Choreography**:
  - Real-time 3D model rendering powered by Three.js and React Three Fiber (`@react-three/fiber` & `@react-three/drei`).
  - Seamless multi-axis rotation, camera choreography, and lighting transitions tied to viewport scroll progress.
  - Draco / Meshopt geometry compression for instant asset streaming and high frame-rate rendering.

- **🎯 Screen-Projected Tech Hotspots**:
  - Dynamic 3D-to-2D screen projection mapping technology logos (Flutter, React.js, Node.js, Python) directly onto the 3D surface.
  - Interactive hover pulses and instant scroll focus to specific tech stack categories.

- **🗂️ Horizontal Scrolling "Works" Showcase**:
  - Horizontal track scrolling gallery featuring detailed engineering cards with metrics, tags, and category taxonomies.
  - Portaled modal view displaying deep-dive project breakdowns, technical architectures, live deployment demos, and GitHub repositories.

- **⏳ Career & Education Timeline**:
  - Chronological journey detailing academic milestones (BCA, MCA at NMAMIT Nitte) and industry experience (Software Developer Intern at Softionik Solutions).

- **🌌 Atmospheric Visual Backdrop**:
  - Custom procedural gradient mesh, floating wave particles, ambient light rings, and responsive glassmorphism.
  - Accessible design supporting `prefers-reduced-motion` and automated WebGL fallback handling.

---

## 🛠️ Featured Engineering Projects

| Project | Domain | Tech Stack | Repository |
| :--- | :--- | :--- | :--- |
| **CosmicVed** | Vedic Astrology & Numerology | Flutter, Dart, Riverpod, Swiss Ephemeris (`sweph`), SQLite, Hive, Freezed | [GitHub](https://github.com/karanks6/CosmicVed) |
| **DecorMatch AI** | AI Interior Styling Assistant | Flutter, Python, FastAPI, YOLOv8, EfficientNetV2, OpenCV, ARCore, Firebase | [GitHub](https://github.com/karanks6/DecorMatch-AI-Intelligent-Interior-Styling-Assistant) |
| **Porsche 911 GT3 RS** | Interactive 3D Supercar Configurator | React.js, Three.js, WebGL, GLSL Shaders, Tailwind CSS, Vite | [GitHub](https://github.com/karanks6/Porsche_911_GT3_RS) |
| **PlanetEdu** | GPU Planetary & Keplerian Orbitals | React.js, Three.js, WebGL, GLSL Shaders, TypeScript, Vite | [GitHub](https://github.com/karanks6/PlanetEdu) |
| **Vistone** | AI Skin Tone & Color Analysis | Python, FastAPI, OpenCV, MediaPipe Face Mesh, GMM, Colour Science | [GitHub](https://github.com/karanks6/Vistone-AI-Powered-Colour-Palette-Matcher) |
| **iCar** | Smart Carpooling Web Platform | MongoDB, Express.js, React.js, Node.js, JWT, Mapbox, Socket.io | [GitHub](https://github.com/karanks6/iCar-Smart-Carpooling-Web-Application) |

---

## 💻 Tech Stack

### Core Frontend & Frameworks
- **React 19**: Modern concurrent UI architecture and component state management.
- **TypeScript**: Strict type safety across 3D math, hotspot vectors, and application state.
- **Vite**: Ultra-fast module bundling and optimized asset pipeline.

### 3D Graphics & Animation
- **Three.js**: Low-level WebGL graphics engine.
- **@react-three/fiber**: Declarative 3D scene graph orchestration.
- **@react-three/drei**: Specialized 3D primitives, camera controls, and loader utilities.
- **meshoptimizer**: Mesh optimization runtime for fast GLTF/GLB loading and rendering.

### UI & Styling
- **Custom CSS3 Design System**: Tailored HSL tokens, backdrop filters, clamp-based responsive typography, and micro-interactions.
- **Lucide React**: Clean, lightweight vector iconography.

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (version 18 or higher recommended)
- npm or yarn or pnpm

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/karanks6/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build locally**:
   ```bash
   npm run preview
   ```

---

## 📂 Project Structure

```plaintext
Portfolio/
├── asset/                   # 3D assets, textures, and downloadable resume
│   ├── 3dmodel.glb          # Optimized 3D model binary
│   ├── hero-bg.png          # High-resolution backdrop graphics
│   └── Resume.pdf           # Curriculum Vitae
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ChromeFrame.tsx  # Fixed navigation, branding, and social links
│   │   ├── Hero.tsx         # Hero introduction and scroll cues
│   │   ├── Works.tsx        # Horizontal gallery & portaled project modal
│   │   ├── Skills.tsx       # Core competencies and tech stacks
│   │   ├── Timeline.tsx     # Education and experience timeline
│   │   └── Contact.tsx      # Direct contact channel and footer
│   ├── data/
│   │   ├── content.ts       # Structured project and career data
│   │   └── stickers.ts      # Hotspot coordinates and tech metadata
│   ├── three/
│   │   ├── Scene.tsx        # Canvas setup, lighting, and camera controller
│   │   └── Model.tsx        # 3D model loader and scroll animations
│   ├── App.tsx              # Root orchestration and scroll progress listener
│   └── index.css            # Global styling, tokens, and animations
├── index.html               # Entry HTML shell
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
└── vite.config.ts           # Vite build pipeline and custom asset streaming
```

---

## 📬 Contact & Connect

**Karan S Suvarna**  
*Software Developer | MCA Graduate*  
Mangalore, Karnataka, India

- 🌐 **Portfolio**: [aboutkaran.vercel.app](https://aboutkaran.vercel.app/)
- 💻 **GitHub**: [@karanks6](https://github.com/karanks6)
- 👔 **LinkedIn**: [Karan Suvarna](https://www.linkedin.com/in/karan-suvarna-5a0426291/)
- 📧 **Email**: [suvarnakaran77@gmail.com](mailto:suvarnakaran77@gmail.com)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
