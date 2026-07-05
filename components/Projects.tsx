"use client";

import { useState, useRef, MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ShieldAlert, Cpu, Hand, Mic, BrainCircuit, FileSpreadsheet, Lock } from "lucide-react";

interface Project {
  title: string;
  category: string;
  description: string;
  tech: string[];
  features: string[];
  github: string;
  demo: string;
  graphicType: "air_mouse" | "jarvis" | "placement" | "quantum" | "portfolio";
}

const PROJECTS_DATA: Project[] = [
  {
    title: "AI Air Mouse",
    category: "Computer Vision & Python",
    description: "A touchless virtual mouse interface that maps hand coordinates to desktop mouse operations using computer vision models.",
    tech: ["Python", "OpenCV", "MediaPipe"],
    features: [
      "Real-time hand skeletal tracking with MediaPipe",
      "Interactive gesture mapping (clicks, scroll, drag-drop)",
      "Adaptive pointer velocity filter to prevent jitter",
      "Low CPU resource usage optimized for standard webcams"
    ],
    github: "https://github.com/Mahesh-Injarapu",
    demo: "#",
    graphicType: "air_mouse"
  },
  {
    title: "Jarvis AI Assistant",
    category: "Speech & Automation",
    description: "An automated voice assistant capable of scheduling calendar slots, searching web endpoints, and triggering automated processes.",
    tech: ["Python", "SpeechRecognition", "Pyttsx3"],
    features: [
      "High accuracy speech-to-text input parsing",
      "Semantic intent analyzer mapping phrases to actions",
      "System control automation (apps, files, emails)",
      "Multi-API sync for instant weather, search, and news"
    ],
    github: "https://github.com/Mahesh-Injarapu",
    demo: "#",
    graphicType: "jarvis"
  },
  {
    title: "Placement360 AI",
    category: "Enterprise Web App",
    description: "A secure online ecosystem evaluating students via AI mock interviews, auditing resumes, and tracking placements.",
    tech: ["Next.js", "Node.js", "MySQL", "TailwindCSS"],
    features: [
      "AI resume score optimizer mapping keywords to job descriptions",
      "Real-time interview scoring feedback interface",
      "Relational MySQL schema managing multi-user data streams",
      "Live placements dashboard showing recruiter audits"
    ],
    github: "https://github.com/Mahesh-Injarapu",
    demo: "#",
    graphicType: "placement"
  },
  {
    title: "QuantumShield X",
    category: "Cryptography & AI",
    description: "An audit scanner and AI toolkit easing transition from legacy RSA encryption to Post-Quantum Cryptographic primitives.",
    tech: ["Next.js", "Post-Quantum Cryptography", "AI Migration"],
    features: [
      "Automated system scan mapping vulnerable encryption APIs",
      "Quantum-safe key exchange wrapping library (Kyber/Dilithium)",
      "Interactive telemetry dashboard detailing migration timelines",
      "AI scanner pointing out hardcoded keys in source repos"
    ],
    github: "https://github.com/Mahesh-Injarapu",
    demo: "#",
    graphicType: "quantum"
  },
  {
    title: "3D Personal Portfolio",
    category: "Creative Development",
    description: "This portfolio! A responsive Next.js and Three.js scrollytelling web layout showing full-stack achievements.",
    tech: ["Next.js", "Three.js", "React Three Fiber", "Framer Motion"],
    features: [
      "Interactive 3D landing mesh reacting to mouse movement",
      "Performance-focused preloaded scroll storytelling sequence",
      "Fully responsive glassmorphic interfaces and custom particles",
      "Neon styling variables rendering cyber-aesthetics"
    ],
    github: "https://github.com/Mahesh-Injarapu",
    demo: "#",
    graphicType: "portfolio"
  }
];

// Custom CSS Graphic rendering to bypass image copies
function ProjectGraphic({ type }: { type: string }) {
  switch (type) {
    case "air_mouse":
      return (
        <div className="absolute inset-0 w-full h-full bg-[#02020a] flex items-center justify-center overflow-hidden border-b border-white/5">
          {/* Futuristic grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px]" />
          
          {/* Glowing cursor tracking circle */}
          <motion.div 
            animate={{ x: [0, 40, -30, 20, 0], y: [0, -30, 40, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-20 h-20 rounded-full border border-[#00f0ff] bg-[#00f0ff]/5 flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.2)]"
          >
            <Hand className="w-8 h-8 text-[#00f0ff] animate-pulse" />
          </motion.div>
          
          {/* Graph nodes */}
          <svg className="absolute inset-0 w-full h-full opacity-35">
            <line x1="10%" y1="20%" x2="40%" y2="80%" stroke="#bd00ff" strokeWidth="0.5" strokeDasharray="3 3" />
            <line x1="40%" y1="80%" x2="80%" y2="40%" stroke="#00ffcc" strokeWidth="0.5" />
            <circle cx="10%" cy="20%" r="3" fill="#bd00ff" />
            <circle cx="80%" cy="40%" r="3" fill="#00ffcc" />
          </svg>
        </div>
      );

    case "jarvis":
      return (
        <div className="absolute inset-0 w-full h-full bg-[#02020a] flex items-center justify-center overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(189,0,255,0.1)_0%,transparent_75%)]" />
          
          {/* Waveform circles */}
          <div className="relative w-28 h-28 flex items-center justify-center">
            <motion.div 
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full border border-[#bd00ff]/30 shadow-[0_0_15px_rgba(189,0,255,0.2)]"
            />
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute w-20 h-20 rounded-full border border-[#00f0ff]/20 shadow-[0_0_10px_rgba(0,240,255,0.1)]"
            />
            <Mic className="w-8 h-8 text-[#00f0ff] animate-bounce relative z-10" />
          </div>

          {/* Glowing database scanner */}
          <div className="absolute bottom-4 left-4 right-4 h-1.5 bg-[#00f0ff]/10 rounded-full overflow-hidden border border-white/5">
            <motion.div 
              animate={{ left: ["-100%", "100%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#bd00ff] to-transparent"
            />
          </div>
        </div>
      );

    case "placement":
      return (
        <div className="absolute inset-0 w-full h-full bg-[#02020a] flex flex-col justify-between p-4 overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:10px_10px]" />
          
          {/* Mini UI Header */}
          <div className="flex justify-between items-center relative z-10 text-[9px] font-mono text-gray-500 border-b border-white/5 pb-2">
            <span>PLACEMENT_PORTAL.EXE</span>
            <span className="text-[#00ffcc] animate-pulse">LIVE SCORE: 94%</span>
          </div>

          {/* Mini UI Charts */}
          <div className="flex items-end gap-3 h-20 px-2 justify-center relative z-10">
            {[35, 60, 45, 80, 50, 95, 70].map((h, i) => (
              <motion.div 
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: `${h}%` }}
                transition={{ duration: 0.8, delay: i * 0.05 }}
                className="w-3 bg-gradient-to-t from-[#00f0ff] to-[#bd00ff] rounded-t-sm shadow-[0_0_8px_rgba(0,240,255,0.3)]"
              />
            ))}
          </div>

          {/* Mini UI Foot */}
          <div className="flex items-center gap-2 relative z-10 text-[8px] font-mono text-gray-500">
            <FileSpreadsheet className="w-3.5 h-3.5 text-[#00ffcc]" />
            <span>AUDITING RESUME DATABASE...</span>
          </div>
        </div>
      );

    case "quantum":
      return (
        <div className="absolute inset-0 w-full h-full bg-[#02020a] flex items-center justify-center overflow-hidden border-b border-white/5">
          {/* Encryption matrix layout */}
          <div className="absolute inset-0 text-green-500/20 font-mono text-[7px] p-2 leading-none select-none break-all">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="mb-0.5">
                0100101010010101111010101001010100110010101001010101010011
              </div>
            ))}
          </div>

          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#02020a]/80 to-[#02020a]" />

          {/* Glowing central lock */}
          <motion.div 
            animate={{ rotateY: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 rounded-xl border border-[#00ffcc]/40 bg-black/60 flex items-center justify-center shadow-[0_0_20px_rgba(0,255,204,0.15)] relative z-10"
          >
            <Lock className="w-6 h-6 text-[#00ffcc]" />
          </motion.div>

          {/* Shield Scanner bar */}
          <motion.div 
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 w-full h-[1px] bg-[#00ffcc] shadow-[0_0_8px_#00ffcc] pointer-events-none"
          />
        </div>
      );

    case "portfolio":
      return (
        <div className="absolute inset-0 w-full h-full bg-[#02020a] flex items-center justify-center overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.08)_0%,transparent_60%)]" />

          {/* Orbiting particles */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="relative w-24 h-24 rounded-full border border-dashed border-[#bd00ff]/20 flex items-center justify-center"
          >
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 rounded-full border border-dashed border-[#00f0ff]/20 flex items-center justify-center"
            >
              <BrainCircuit className="w-7 h-7 text-[#00ffcc]" />
            </motion.div>
            
            {/* Outer orbiting ring node */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#bd00ff] shadow-[0_0_8px_#bd00ff]" />
          </motion.div>
        </div>
      );

    default:
      return null;
  }
}

// 3D tilt project card component
function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates relative to card center
    const x = e.clientX - rect.left - width / 2;
    const y = e.clientY - rect.top - height / 2;

    // Tilt limits (max 8 degrees for stability)
    const tiltX = (y / (height / 2)) * -6;
    const tiltY = (x / (width / 2)) * 6;

    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => setModalOpen(true)}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.02 : 1})`,
          transition: hovered ? "none" : "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
        className="glass-card rounded-2xl border border-white/5 flex flex-col overflow-hidden h-[460px] cursor-pointer group relative"
      >
        {/* Top Graphic Panel */}
        <div className="h-[210px] w-full relative overflow-hidden">
          <ProjectGraphic type={project.graphicType} />
          
          {/* Category Tag */}
          <span className="absolute top-4 left-4 px-2.5 py-1 text-[9px] font-mono font-bold tracking-wider text-black bg-[#00ffcc] rounded-md shadow-lg z-10 uppercase">
            {project.category}
          </span>
        </div>

        {/* Info panel */}
        <div className="p-6 flex flex-col justify-between flex-grow">
          <div className="space-y-3">
            <h3 className="text-2xl font-black text-white group-hover:text-[#00f0ff] transition-colors">
              {project.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 font-light">
              {project.description}
            </p>
          </div>

          {/* Badges and actions */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span key={t} className="px-2 py-0.5 text-[9px] font-mono text-gray-400 bg-white/5 rounded border border-white/5">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex justify-between items-center text-xs font-semibold pt-1 text-gray-500 group-hover:text-white transition-colors">
              <span>Inspect details</span>
              <ExternalLink className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Futuristic Project Detail Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-[#020205]/90 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-[#0a0a16] border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.25)] z-10 flex flex-col max-h-[90vh]"
            >
              {/* Scanline grid overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[length:100%_4px] pointer-events-none" />
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#00f0ff] to-[#bd00ff]" />

              {/* Graphic */}
              <div className="h-[240px] w-full relative">
                <ProjectGraphic type={project.graphicType} />
                <button 
                  onClick={() => setModalOpen(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/10 hover:border-white/30 transition-all font-mono text-xs cursor-pointer"
                >
                  X
                </button>
              </div>

              {/* Contents (Scrollable) */}
              <div className="p-6 md:p-8 overflow-y-auto no-scrollbar space-y-6 flex-grow">
                <div className="flex flex-wrap gap-2 items-center justify-between border-b border-white/5 pb-4">
                  <div>
                    <h2 className="text-3xl font-black text-white tracking-wide">{project.title}</h2>
                    <p className="text-xs text-[#00ffcc] font-mono tracking-widest mt-1 uppercase">{project.category}</p>
                  </div>
                  
                  {/* Technology labels */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span key={t} className="px-2.5 py-1 text-[10px] font-mono text-white bg-[#bd00ff]/20 rounded border border-[#bd00ff]/30 uppercase font-semibold">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest">Overview</h4>
                  <p className="text-gray-300 text-base leading-relaxed font-light">{project.description}</p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest">Core Deliverables & Features</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {project.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex gap-2.5 items-start p-3 bg-white/5 border border-white/5 rounded-xl">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] mt-1.5 shadow-[0_0_6px_#00f0ff] flex-shrink-0" />
                        <span className="text-xs text-gray-300 font-light leading-relaxed">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-4 pt-4 border-t border-white/5">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white font-semibold flex items-center gap-2 transition-all"
                  >
                    <Github className="w-4 h-4 text-[#00f0ff]" />
                    <span>View GitHub Repository</span>
                  </a>

                  <button
                    onClick={() => alert("Virtual Environment Launch Code Triggered. Mock Simulator Initialized.")}
                    className="px-5 py-2.5 bg-gradient-to-r from-[#00f0ff] to-[#bd00ff] text-black font-bold rounded-lg flex items-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all hover:shadow-[0_0_20px_rgba(189,0,255,0.4)] cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Launch Live Simulation</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-28 px-6 md:px-12 bg-[#020205] overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#bd00ff]/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#00f0ff]/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-20 space-y-2">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            SELECTED <span className="bg-gradient-to-r from-[#00f0ff] to-[#bd00ff] bg-clip-text text-transparent text-glow-blue">WORKS</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#bd00ff] to-[#00f0ff] mx-auto rounded-full" />
        </div>

        {/* Project cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS_DATA.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
