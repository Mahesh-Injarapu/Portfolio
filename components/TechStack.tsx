"use client";

import { useRef, useState, MouseEvent } from "react";
import { motion } from "framer-motion";

interface TechItem {
  name: string;
  category: string;
  color: string;
  glowColor: string;
}

const TECH_ITEMS: TechItem[] = [
  { name: "React", category: "Library", color: "#61dafb", glowColor: "rgba(97,218,251,0.2)" },
  { name: "Next.js", category: "Framework", color: "#ffffff", glowColor: "rgba(255,255,255,0.2)" },
  { name: "TypeScript", category: "Language", color: "#3178c6", glowColor: "rgba(49,120,198,0.2)" },
  { name: "JavaScript", category: "Language", color: "#f7df1e", glowColor: "rgba(247,223,30,0.2)" },
  { name: "Node.js", category: "Runtime", color: "#339933", glowColor: "rgba(51,153,51,0.2)" },
  { name: "Express", category: "Framework", color: "#ffffff", glowColor: "rgba(255,255,255,0.1)" },
  { name: "Python", category: "Language", color: "#3776ab", glowColor: "rgba(55,118,171,0.2)" },
  { name: "OpenCV", category: "Computer Vision", color: "#5c3ee6", glowColor: "rgba(92,62,230,0.2)" },
  { name: "MediaPipe", category: "AI Framework", color: "#00ffcc", glowColor: "rgba(0,255,204,0.2)" },
  { name: "MySQL", category: "Database", color: "#4479a1", glowColor: "rgba(68,121,161,0.2)" },
  { name: "MongoDB", category: "Database", color: "#47a248", glowColor: "rgba(71,162,72,0.2)" },
  { name: "HTML5", category: "Language", color: "#e34f26", glowColor: "rgba(227,79,38,0.2)" },
  { name: "CSS3", category: "Styling", color: "#1572b6", glowColor: "rgba(21,114,182,0.2)" },
  { name: "Git & GitHub", category: "DevOps", color: "#f05032", glowColor: "rgba(240,80,50,0.2)" },
  { name: "Artificial Intelligence", category: "Domain", color: "#bd00ff", glowColor: "rgba(189,0,255,0.2)" },
];

function FloatingTechBadge({ item, index }: { item: TechItem; index: number }) {
  const badgeRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const badge = badgeRef.current;
    if (!badge) return;

    const rect = badge.getBoundingClientRect();
    const bx = rect.left + rect.width / 2;
    const by = rect.top + rect.height / 2;

    // Distance vector
    const dx = e.clientX - bx;
    const dy = e.clientY - by;

    // Shift badge slightly in direction of mouse (magnetic pull effect)
    setOffset({ x: dx * 0.25, y: dy * 0.25 });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setOffset({ x: 0, y: 0 });
  };

  // Assign random drift delay to each badge for async floating sensation
  const floatingDrift = {
    y: [0, -6, 0, 6, 0],
    x: [0, 4, 0, -4, 0],
    transition: {
      duration: 5 + (index % 3),
      repeat: Infinity,
      ease: "easeInOut" as const,
    }
  };

  return (
    <motion.div
      ref={badgeRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={hovered ? { x: offset.x, y: offset.y } : floatingDrift}
      style={{
        transition: hovered ? "none" : "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
      }}
      className="glass-card px-5 py-4 rounded-xl border border-white/5 flex flex-col justify-center items-center text-center cursor-pointer select-none group relative h-[80px]"
    >
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
        style={{
          boxShadow: `0 0 20px ${item.glowColor}`,
          border: `1px solid ${item.color}33`,
          background: `${item.color}05`
        }}
      />

      <span 
        className="font-bold text-base transition-colors group-hover:scale-105 duration-300"
        style={{ color: hovered ? item.color : "#ffffff" }}
      >
        {item.name}
      </span>
      <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mt-1">
        {item.category}
      </span>
    </motion.div>
  );
}

export default function TechStack() {
  return (
    <section id="techstack" className="relative py-20 px-6 md:px-12 bg-[#020205] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-[#bd00ff]/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16 space-y-2">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white">
            INTERACTIVE <span className="bg-gradient-to-r from-[#bd00ff] to-[#00f0ff] bg-clip-text text-transparent text-glow-blue">STACK</span>
          </h2>
          <p className="text-xs text-gray-500 font-mono tracking-widest uppercase">Hover badges to experience magnetic pull</p>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {TECH_ITEMS.map((item, index) => (
            <FloatingTechBadge key={item.name} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
