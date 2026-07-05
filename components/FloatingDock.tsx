"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { User, Cpu, Code2, Github, MessageSquare, FileText, Mail } from "lucide-react";

interface DockItem {
  label: string;
  icon: any;
  action: () => void;
}

function DockIcon({ icon: Icon, mouseX, action, label }: { icon: any; mouseX: any; action: () => void; label: string }) {
  const ref = useRef<HTMLDivElement>(null);

  // Calculate distance from mouse to icon center
  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Map distance to width/height transformation
  const widthTransform = useTransform(distance, [-150, 0, 150], [42, 66, 42]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [42, 66, 42]);

  // Spring animations for fluid rubbery scaling
  const width = useSpring(widthTransform, { mass: 0.1, stiffness: 200, damping: 12 });
  const height = useSpring(heightTransform, { mass: 0.1, stiffness: 200, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width, height }}
      onClick={action}
      className="rounded-full bg-white/5 border border-white/5 hover:border-[#00f0ff]/30 text-gray-400 hover:text-white flex items-center justify-center cursor-pointer relative group transition-all"
    >
      <Icon className="w-1/2 h-1/2" />
      
      {/* Tooltip */}
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 text-[9px] font-mono font-bold uppercase tracking-wider text-black bg-[#00ffcc] rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md z-50 whitespace-nowrap">
        {label}
      </span>
    </motion.div>
  );
}

export default function FloatingDock() {
  const mouseX = useMotionValue(Infinity);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleTriggerChat = () => {
    const chatBtn = document.getElementById("ai-chat-trigger-btn");
    if (chatBtn) chatBtn.click();
  };

  const items: DockItem[] = [
    { label: "About", icon: User, action: () => handleScrollTo("about") },
    { label: "Skills", icon: Cpu, action: () => handleScrollTo("skills") },
    { label: "Projects", icon: Code2, action: () => handleScrollTo("projects") },
    { label: "GitHub", icon: Github, action: () => handleScrollTo("github") },
    { label: "AI Helper", icon: MessageSquare, action: handleTriggerChat },
    { label: "Resume", icon: FileText, action: () => handleScrollTo("resume") },
    { label: "Contact", icon: Mail, action: () => handleScrollTo("contact") },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden md:block">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="mx-auto flex h-16 items-end gap-4 rounded-2xl bg-[#0a0a16]/65 border border-white/5 px-4 pb-2.5 backdrop-blur-md shadow-[0_15px_35px_rgba(0,0,0,0.5)]"
      >
        {items.map((item, idx) => (
          <DockIcon
            key={idx}
            mouseX={mouseX}
            icon={item.icon}
            action={item.action}
            label={item.label}
          />
        ))}
      </motion.div>
    </div>
  );
}
