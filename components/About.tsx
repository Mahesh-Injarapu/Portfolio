"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { User, MapPin, BookOpen, Cpu, Award } from "lucide-react";

// Counter component for stats
function Counter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const totalMiliseconds = duration * 1000;
    const stepTime = Math.max(Math.floor(totalMiliseconds / end), 15);
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return <span ref={ref} className="text-3xl md:text-4xl font-extrabold text-[#00f0ff]">{count}</span>;
}

export default function About() {
  return (
    <section id="about" className="relative py-28 px-6 md:px-12 bg-[#020205] overflow-hidden">
      {/* Background neon glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#bd00ff]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00f0ff]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16 space-y-2">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            ABOUT <span className="bg-gradient-to-r from-[#00f0ff] to-[#bd00ff] bg-clip-text text-transparent text-glow-blue">ME</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#00f0ff] to-[#bd00ff] mx-auto rounded-full" />
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Profile Card (4 Columns) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-4 flex flex-col items-center"
          >
            <div className="relative group w-full max-w-[320px] p-6 glass-card rounded-2xl flex flex-col items-center text-center overflow-hidden border border-white/5">
              
              {/* Scanline / Grid overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[length:100%_4px] pointer-events-none" />
              <div className="absolute top-0 left-0 w-full h-[2px] bg-[#00f0ff] animate-pulse" />

              {/* Avatar placeholder with glowing cyber border */}
              <div className="relative w-40 h-40 rounded-full p-1 bg-gradient-to-tr from-[#00f0ff] via-[#bd00ff] to-[#00ffcc] shadow-[0_0_20px_rgba(0,240,255,0.3)] mb-6 overflow-hidden">
                <div className="w-full h-full rounded-full bg-[#0a0a16] flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                  <User className="w-20 h-20 text-[#00f0ff] opacity-80" />
                  
                  {/* Cyber ring */}
                  <div className="absolute inset-0 border border-dashed border-[#bd00ff]/40 animate-[spin_30s_linear_infinite]" />
                </div>
              </div>

              {/* Name & Title */}
              <h3 className="text-2xl font-bold text-white tracking-wide">Mahesh Injarapu</h3>
              <p className="text-[#00ffcc] text-xs font-mono tracking-wider mt-1 uppercase">AI Developer & Student</p>

              <div className="w-full h-[1px] bg-white/5 my-6" />

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="flex flex-col items-center p-3 rounded-lg bg-white/5 border border-white/5 hover:border-[#00f0ff]/30 transition-all">
                  <Counter value={15} />
                  <span className="text-[10px] font-mono text-gray-400 mt-1 uppercase tracking-wider">Projects</span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-lg bg-white/5 border border-white/5 hover:border-[#bd00ff]/30 transition-all">
                  <Counter value={2} />
                  <span className="text-[10px] font-mono text-gray-400 mt-1 uppercase tracking-wider">Years Coding</span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-lg bg-white/5 border border-white/5 hover:border-[#00ffcc]/30 transition-all">
                  <Counter value={20} />
                  <span className="text-[10px] font-mono text-gray-400 mt-1 uppercase tracking-wider">Techs Used</span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-lg bg-white/5 border border-white/5 hover:border-[#00f0ff]/30 transition-all">
                  <Counter value={25} />
                  <span className="text-[10px] font-mono text-gray-400 mt-1 uppercase tracking-wider">Repos</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Details & Description (8 Columns) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-8 flex flex-col justify-center space-y-6"
          >
            {/* Terminal Console Block */}
            <div className="glass-panel p-6 md:p-8 rounded-2xl border border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
              <div className="flex items-center gap-1.5 mb-6 text-gray-500 font-mono text-xs border-b border-white/5 pb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <span className="ml-2">mahesh_profile.json // UTF-8</span>
              </div>

              {/* Bio description */}
              <p className="text-gray-300 text-base md:text-lg leading-relaxed font-light">
                I am <span className="text-[#00f0ff] font-semibold">Mahesh Injarapu</span>, a Computer Science Engineering student specializing in <span className="text-[#bd00ff] font-semibold">Artificial Intelligence and Machine Learning</span> at Dr.RVR NRI Institute of Technology Deemed to be University. I enjoy designing modern web applications, developing AI-powered solutions, and solving real-world problems using technology. I continuously improve my skills through practical projects, hackathons, and learning modern software development tools. My goal is to become a highly skilled Full Stack Developer and AI Engineer while building impactful digital products.
              </p>
            </div>

            {/* Structured details cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-4 p-4 glass-card rounded-xl border border-white/5">
                <div className="p-3 bg-[#00f0ff]/10 rounded-lg text-[#00f0ff]">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest">Education</h4>
                  <p className="text-sm font-semibold text-white">B.Tech (CSE AIML)</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 glass-card rounded-xl border border-white/5">
                <div className="p-3 bg-[#bd00ff]/10 rounded-lg text-[#bd00ff]">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest">Specialization</h4>
                  <p className="text-sm font-semibold text-white">AI & Machine Learning</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 glass-card rounded-xl border border-white/5">
                <div className="p-3 bg-[#00ffcc]/10 rounded-lg text-[#00ffcc]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest">Location</h4>
                  <p className="text-sm font-semibold text-white">Andhra Pradesh, India</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 glass-card rounded-xl border border-white/5">
                <div className="p-3 bg-[#00f0ff]/10 rounded-lg text-[#00f0ff]">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest">Goal</h4>
                  <p className="text-sm font-semibold text-white">Full Stack AI Engineer</p>
                </div>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
