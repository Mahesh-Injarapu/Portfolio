"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, BookOpen, Award } from "lucide-react";

const EDUCATION_DATA = [
  {
    institution: "NRI Institute of Technology",
    degree: "Bachelor of Technology (B.Tech)",
    branch: "Computer Science Engineering (Artificial Intelligence & Machine Learning)",
    period: "2022 – Present",
    location: "Andhra Pradesh, India",
    details: [
      "Specializing in neural networks, machine learning algorithms, deep learning, computer vision, and NLP.",
      "Acquiring strong hands-on skills in Python programming, OpenCV, MediaPipe, database management, and full-stack development.",
      "Actively participating in college coding bootcamps, technical clubs, and hackathons.",
      "Maintained a strong academic record with practical excellence in software engineering labs."
    ],
  }
];

export default function Education() {
  return (
    <section id="education" className="relative py-28 px-6 md:px-12 bg-[#020205] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[#00ffcc]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-20 space-y-2">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            ACADEMIC <span className="bg-gradient-to-r from-[#00f0ff] to-[#bd00ff] bg-clip-text text-transparent text-glow-blue">TIMELINE</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#bd00ff] to-[#00f0ff] mx-auto rounded-full" />
        </div>

        {/* Timeline Container */}
        <div className="relative border-l border-[#00f0ff]/30 ml-4 md:ml-12 pl-8 md:pl-16 space-y-12">
          {EDUCATION_DATA.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              {/* Pulsing Timeline Node */}
              <div className="absolute -left-[41px] md:-left-[73px] top-1.5 w-6 h-6 rounded-full bg-black border-2 border-[#00f0ff] flex items-center justify-center shadow-[0_0_12px_#00f0ff] z-10">
                <div className="w-2.5 h-2.5 rounded-full bg-[#bd00ff] animate-ping" />
              </div>

              {/* Glass Card Container */}
              <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/5 relative overflow-hidden group">
                {/* Decorative side accent */}
                <div className="absolute left-0 top-0 h-full w-[4px] bg-gradient-to-b from-[#00f0ff] to-[#bd00ff]" />

                {/* Card Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-wide group-hover:text-[#00f0ff] transition-colors">
                      {edu.degree}
                    </h3>
                    <p className="text-[#00ffcc] font-mono text-xs tracking-wider mt-1.5 flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-[#bd00ff]" />
                      <span>{edu.branch}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-gray-400 bg-white/5 border border-white/5 px-3.5 py-1.5 rounded-full self-start md:self-center">
                    <Calendar className="w-3.5 h-3.5 text-[#00f0ff]" />
                    <span>{edu.period}</span>
                  </div>
                </div>

                {/* Institution Details */}
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-gray-300 flex items-center gap-2">
                    <BookOpen className="w-4.5 h-4.5 text-[#bd00ff]" />
                    <span>{edu.institution}</span>
                  </h4>
                  <p className="text-xs text-gray-500 font-mono mt-1">{edu.location}</p>
                </div>

                <div className="w-full h-[1px] bg-white/5 my-5" />

                {/* Key Bullet Highlights */}
                <div className="space-y-3.5">
                  {edu.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00ffcc] shadow-[0_0_6px_#00ffcc] flex-shrink-0" />
                      <p className="text-gray-300 text-sm md:text-base leading-relaxed font-light">
                        {detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
