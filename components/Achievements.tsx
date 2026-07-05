"use client";

import { motion } from "framer-motion";
import { Award, Code2, Users, Rocket, GitPullRequest } from "lucide-react";

const ACHIEVEMENTS = [
  {
    title: "AI Projects Development",
    category: "AI & CV RESEARCH",
    icon: Award,
    description: "Successfully engineered a gesture-controlled AI Air Mouse using OpenCV and MediaPipe models, implementing low-latency mathematical coordinates smoothing filters.",
    period: "2024 - Present"
  },
  {
    title: "Hackathon Participation",
    category: "COLLABORATION & SPEED",
    icon: Users,
    description: "Teamed up in local and regional college hackathons to design and pitch tech solutions, completing rapid prototyping phases for web endpoints and data dashboards.",
    period: "2023 - 2024"
  },
  {
    title: "Web Development Projects",
    category: "FULL STACK WEB",
    icon: Code2,
    description: "Designed database structures and REST APIs for tools like Placement360 AI, successfully linking MySQL relational tables to Next.js node servers.",
    period: "2023 - Present"
  },
  {
    title: "Git & GitHub Training",
    category: "WORKFLOW AUTOMATION",
    icon: GitPullRequest,
    description: "Acquired deep understanding of code version control, pull requests workflow, branching standards, and custom project releases automation.",
    period: "2023"
  },
  {
    title: "Portfolio Development",
    category: "CREATIVE CODING",
    icon: Rocket,
    description: "Built and fine-tuned this 3D responsive creative scrollytelling web layout, optimizing assets loading speed for high performance.",
    period: "2026"
  }
];

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-28 px-6 md:px-12 bg-[#020205] overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#bd00ff]/3 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <div className="text-center mb-20 space-y-2">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            KEY <span className="bg-gradient-to-r from-[#00f0ff] to-[#bd00ff] bg-clip-text text-transparent text-glow-blue">ACHIEVEMENTS</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#bd00ff] to-[#00f0ff] mx-auto rounded-full" />
        </div>

        {/* Alternate vertical timeline */}
        <div className="relative border-l border-white/10 ml-4 md:ml-0 md:pl-0 space-y-12">
          {ACHIEVEMENTS.map((ach, index) => {
            const Icon = ach.icon;
            return (
              <motion.div
                key={ach.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative pl-8 md:pl-12"
              >
                {/* Node node */}
                <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-black border border-[#bd00ff] rounded-full shadow-[0_0_8px_#bd00ff] z-10" />

                {/* Card */}
                <div className="glass-card p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-[0.02] transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at top right, #bd00ff 0%, transparent 60%)`
                    }}
                  />
                  <div className="absolute left-0 top-0 h-full w-[3px] bg-[#bd00ff]" />

                  {/* Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-[#bd00ff]/10 rounded-lg text-[#bd00ff]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-[#00ffcc] tracking-widest uppercase font-bold">{ach.category}</span>
                        <h3 className="text-xl font-bold text-white group-hover:text-[#bd00ff] transition-colors">{ach.title}</h3>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-gray-500 bg-white/5 border border-white/5 px-2.5 py-1 rounded-md">{ach.period}</span>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed font-light">
                    {ach.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
