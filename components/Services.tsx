"use client";

import { motion } from "framer-motion";
import { 
  Laptop, Brain, Layers, Server, Palette, Terminal, 
  CheckCircle2, ArrowUpRight 
} from "lucide-react";

const SERVICES = [
  {
    title: "Web Development",
    icon: Laptop,
    color: "#00f0ff",
    description: "End-to-end full-stack web applications tailored for scalability, premium animations, and SEO-optimized structures.",
    deliverables: ["Full-Stack Architecture", "Next.js / React Apps", "Scalable REST APIs", "Responsive Layouts"],
  },
  {
    title: "AI Development",
    icon: Brain,
    color: "#bd00ff",
    description: "Integrating intelligent models, computer vision systems, and automated machine learning workflows into products.",
    deliverables: ["OpenCV / MediaPipe Tools", "LLM integrations", "Neural Network Models", "Automation Scripts"],
  },
  {
    title: "Frontend Development",
    icon: Layers,
    color: "#00ffcc",
    description: "High-performance interactive frontends with complex state management, custom physics animations, and fluid transitions.",
    deliverables: ["Pixel-Perfect Tailwind UI", "Framer Motion Animations", "Type-safe React Code", "Cross-browser compatibility"],
  },
  {
    title: "Backend Development",
    icon: Server,
    color: "#ff007f",
    description: "Robust backends and secure server infrastructures with real-time operations, relational and non-relational database layers.",
    deliverables: ["Express & Node.js Server", "Database Design (MySQL/Mongo)", "RESTful API Development", "Authentication & Security"],
  },
  {
    title: "UI Design",
    icon: Palette,
    color: "#ffb900",
    description: "Modern, startup-level landing page layouts with glassmorphic elements, tailored gradients, and premium cyber aesthetics.",
    deliverables: ["Modern Wireframes", "Color Systems & Palettes", "Interactive Prototypes", "Component Design System"],
  },
  {
    title: "Python Applications",
    icon: Terminal,
    color: "#3776ab",
    description: "Custom desktop widgets, web scrapers, data analysis pipelines, automation layers, and AI helpers built in Python.",
    deliverables: ["Computer Vision Systems", "Speech Recognition Tools", "Data Processing Pipelines", "Script Automation Modules"],
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-28 px-6 md:px-12 bg-[#020205] overflow-hidden">
      {/* Background radial overlays */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#00f0ff]/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-[#bd00ff]/3 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-20 space-y-2">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            SERVICES <span className="bg-gradient-to-r from-[#00f0ff] to-[#bd00ff] bg-clip-text text-transparent text-glow-blue">I OFFER</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#00f0ff] to-[#bd00ff] mx-auto rounded-full" />
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true, margin: "-100px" }}
                className="group relative glass-card p-6 md:p-8 rounded-2xl border border-white/5 flex flex-col justify-between overflow-hidden cursor-pointer"
              >
                {/* Neon Accent Glow */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at top right, ${service.color} 0%, transparent 60%)`
                  }}
                />
                
                {/* Decorative border bar */}
                <div 
                  className="absolute top-0 left-0 w-0 h-[3px] group-hover:w-full transition-all duration-500" 
                  style={{ backgroundColor: service.color }}
                />

                {/* Card Top */}
                <div className="space-y-5">
                  {/* Icon & Anchor */}
                  <div className="flex items-center justify-between">
                    <div 
                      className="p-3.5 rounded-xl border border-white/10 flex items-center justify-center transition-all duration-300"
                      style={{ 
                        color: service.color,
                        backgroundColor: `${service.color}10`,
                        boxShadow: `0 0 10px ${service.color}20`
                      }}
                    >
                      <Icon className="w-6 h-6 transition-transform group-hover:rotate-12 duration-500" />
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-gray-600 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#00f0ff] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">
                    {service.description}
                  </p>
                </div>

                {/* Divider */}
                <div className="w-full h-[1px] bg-white/5 my-6" />

                {/* Card Bottom: Deliverables checklist */}
                <ul className="space-y-2">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs font-mono text-gray-300 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: service.color }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
