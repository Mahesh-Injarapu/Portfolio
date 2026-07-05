"use client";

import { useState, useRef, MouseEvent } from "react";
import { motion } from "framer-motion";
import { 
  Code2, Database, Brain, Users, Globe, Terminal, 
  Cpu, Award, GitBranch, Shield 
} from "lucide-react";

interface Skill {
  name: string;
  percentage: number;
  icon: any;
  color: string;
}

const SKILL_CATEGORIES: Record<string, Skill[]> = {
  frontend: [
    { name: "React", percentage: 90, icon: Globe, color: "#00f0ff" },
    { name: "Next.js", percentage: 85, icon: Terminal, color: "#ffffff" },
    { name: "TypeScript", percentage: 80, icon: Code2, color: "#007acc" },
    { name: "JavaScript", percentage: 92, icon: Code2, color: "#f7df1e" },
    { name: "HTML5", percentage: 95, icon: Globe, color: "#e34f26" },
    { name: "CSS3", percentage: 90, icon: Globe, color: "#1572b6" },
  ],
  backend: [
    { name: "Node.js", percentage: 85, icon: Terminal, color: "#339933" },
    { name: "Express", percentage: 80, icon: Cpu, color: "#000000" },
    { name: "Python", percentage: 88, icon: Terminal, color: "#3776ab" },
    { name: "MySQL", percentage: 82, icon: Database, color: "#4479a1" },
    { name: "MongoDB", percentage: 80, icon: Database, color: "#47a248" },
    { name: "Git & GitHub", percentage: 90, icon: GitBranch, color: "#f05032" },
  ],
  ai_ml: [
    { name: "Artificial Intelligence", percentage: 85, icon: Brain, color: "#bd00ff" },
    { name: "OpenCV", percentage: 80, icon: Brain, color: "#5c3ee6" },
    { name: "MediaPipe", percentage: 78, icon: Cpu, color: "#00ffcc" },
    { name: "Problem Solving", percentage: 88, icon: Award, color: "#ffb900" },
  ],
  professional: [
    { name: "Communication", percentage: 90, icon: Users, color: "#00ffcc" },
    { name: "Teamwork", percentage: 92, icon: Users, color: "#bd00ff" },
  ]
};

const CATEGORY_NAMES = [
  { id: "all", label: "All Skills" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend / Database" },
  { id: "ai_ml", label: "AI & ML" },
  { id: "professional", label: "Soft Skills" },
];

// Interactive 3D Tilt Card
function SkillCard({ skill }: { skill: Skill }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const IconComponent = skill.icon;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates relative to card center
    const x = e.clientX - rect.left - width / 2;
    const y = e.clientY - rect.top - height / 2;

    // Convert coordinates to tilt angles (max 15 degrees)
    const tiltX = (y / (height / 2)) * -12;
    const tiltY = (x / (width / 2)) * 12;

    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  // Radial progress calculations
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (skill.percentage / 100) * circumference;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.04 : 1})`,
        transition: hovered ? "none" : "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s",
      }}
      className="glass-card p-5 rounded-2xl border border-white/5 flex items-center justify-between cursor-pointer relative overflow-hidden group h-[110px]"
    >
      {/* Background Hover Glow */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${skill.color} 0%, transparent 70%)`
        }}
      />

      <div className="flex items-center gap-4 relative z-10">
        {/* Dynamic Skill Icon Container */}
        <div 
          className="p-3.5 rounded-xl bg-white/5 border border-white/10 group-hover:border-transparent transition-all flex items-center justify-center"
          style={{
            color: hovered ? skill.color : "#ffffff",
            boxShadow: hovered ? `0 0 15px ${skill.color}40` : "none",
            backgroundColor: hovered ? `${skill.color}10` : "rgba(255,255,255,0.05)"
          }}
        >
          <IconComponent className="w-6 h-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
        </div>
        
        <div>
          <h4 className="text-lg font-bold text-white group-hover:text-white transition-colors">{skill.name}</h4>
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mt-1 block">Level: Expert</span>
        </div>
      </div>

      {/* Radial percentage progress indicator */}
      <div className="relative w-16 h-16 flex items-center justify-center relative z-10">
        <svg className="w-full h-full transform -rotate-90">
          {/* Base track */}
          <circle
            cx="32"
            cy="32"
            r={radius}
            className="stroke-gray-900 fill-transparent"
            strokeWidth="4"
          />
          {/* Progress circle */}
          <motion.circle
            cx="32"
            cy="32"
            r={radius}
            className="fill-transparent"
            strokeWidth="4"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            stroke={skill.color}
            strokeLinecap="round"
            style={{
              filter: hovered ? `drop-shadow(0 0 4px ${skill.color})` : "none"
            }}
          />
        </svg>
        <span className="absolute text-xs font-mono font-bold text-gray-300 group-hover:text-white transition-colors">
          {skill.percentage}%
        </span>
      </div>
    </div>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("all");

  // Get active skills list
  const getSkillsList = () => {
    if (activeCategory === "all") {
      return Object.values(SKILL_CATEGORIES).flat();
    }
    return SKILL_CATEGORIES[activeCategory] || [];
  };

  const skillsList = getSkillsList();

  return (
    <section id="skills" className="relative py-28 px-6 md:px-12 bg-[#020205] overflow-hidden">
      {/* Ambient background accent */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-[#bd00ff]/5 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#00f0ff]/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16 space-y-2">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            TECHNICAL <span className="bg-gradient-to-r from-[#00f0ff] to-[#bd00ff] bg-clip-text text-transparent text-glow-blue">SKILLS</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#00f0ff] to-[#bd00ff] mx-auto rounded-full" />
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORY_NAMES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase font-mono border transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-gradient-to-r from-[#00f0ff] to-[#bd00ff] border-transparent text-black font-extrabold shadow-[0_0_15px_rgba(0,240,255,0.35)]"
                  : "bg-white/5 border-white/5 hover:border-white/20 text-gray-400 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 3D Skills Cards Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillsList.map((skill, index) => (
            <motion.div
              layout
              key={skill.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
              viewport={{ once: true }}
            >
              <SkillCard skill={skill} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
