"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowRight, Download, Mail, Github, Linkedin } from "lucide-react";

const ThreeHero = dynamic(() => import("./ThreeHero"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[400px] w-full items-center justify-center text-sm font-mono text-gray-500">
      <span className="mr-2 h-2.5 w-2.5 animate-ping rounded-full bg-[#00f0ff]" />
      LOADING 3D ENGINE...
    </div>
  ),
});

const ROLES = [
  "Full Stack Developer",
  "AI Enthusiast",
  "Python Developer",
  "Problem Solver",
  "Open Source Learner",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentFullRole = ROLES[roleIndex];
    const typeSpeed = isDeleting ? 30 : 75;

    if (!isDeleting && displayedRole === currentFullRole) {
      timer = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && displayedRole === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    } else {
      timer = setTimeout(() => {
        setDisplayedRole((prev) =>
          isDeleting
            ? currentFullRole.substring(0, prev.length - 1)
            : currentFullRole.substring(0, prev.length + 1)
        );
      }, typeSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayedRole, isDeleting, roleIndex]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6 pb-12 pt-24 md:px-12"
    >
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#bd00ff]/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-[500px] w-[500px] translate-x-1/2 translate-y-1/2 rounded-full bg-[#00f0ff]/8 blur-[120px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 lg:grid-cols-12">
        <div className="flex flex-col justify-center space-y-6 text-left lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="glass-panel flex items-center gap-2 self-start rounded-full border border-[#00f0ff]/30 px-3.5 py-1.5 font-mono text-xs font-semibold tracking-wider text-[#00f0ff]"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#00ffcc]" />
            <span>SYSTEM ONLINE // READY TO CREATE</span>
          </motion.div>

          <div className="space-y-2">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-mono text-lg font-semibold tracking-widest text-[#00ffcc] md:text-xl"
            >
              HI, I'M
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl font-extrabold tracking-tighter text-white md:text-7xl"
            >
              Mahesh{" "}
              <span className="text-glow-blue bg-gradient-to-r from-[#00f0ff] via-[#bd00ff] to-[#00ffcc] bg-clip-text text-transparent">
                Injarapu
              </span>
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex h-10 items-center"
          >
            <p className="font-mono text-xl font-bold text-gray-300 md:text-3xl">
              <span className="text-white">&gt; </span>
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                {displayedRole}
              </span>
              <span className="ml-1 inline-block h-6 w-1.5 animate-pulse bg-[#00ffcc]" />
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-xl text-base font-light leading-relaxed text-gray-400 md:text-lg"
          >
            A computer science engineer specializing in{" "}
            <span className="font-semibold text-[#00f0ff]">
              Artificial Intelligence & Machine Learning
            </span>
            . I build modern full-stack web applications, develop intelligent AI
            tools, and code software solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <button
              onClick={() => scrollToSection("projects")}
              className="flex cursor-pointer items-center gap-2 rounded-lg bg-gradient-to-r from-[#00f0ff] to-[#bd00ff] px-6 py-3 font-bold text-black shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:from-[#bd00ff] hover:to-[#00f0ff] hover:shadow-[0_0_25px_rgba(189,0,255,0.6)]"
            >
              <span>View Projects</span>
              <ArrowRight className="h-4 w-4 text-black" />
            </button>

            <button
              onClick={() => scrollToSection("resume")}
              className="glass-card flex cursor-pointer items-center gap-2 rounded-lg px-6 py-3 font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10"
            >
              <Download className="h-4 w-4 text-[#00ffcc]" />
              <span>Resume</span>
            </button>

            <button
              onClick={() => scrollToSection("contact")}
              className="glass-panel flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 px-6 py-3 font-semibold text-gray-300 transition-all hover:-translate-y-0.5 hover:border-[#00ffcc]/50 hover:text-white"
            >
              <Mail className="h-4 w-4 text-[#00f0ff]" />
              <span>Contact Me</span>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center gap-5 border-t border-white/5 pt-4"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-gray-500">
              Connect:
            </span>

            <a
              href="https://github.com/Mahesh-Injarapu"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/10 bg-white/5 p-2 text-gray-400 transition-all hover:border-[#00f0ff] hover:bg-white/10 hover:text-[#00f0ff]"
            >
              <Github className="h-4 w-4" />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/10 bg-white/5 p-2 text-gray-400 transition-all hover:border-[#bd00ff] hover:bg-white/10 hover:text-[#bd00ff]"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative flex w-full items-center justify-center lg:col-span-5"
        >
          <div className="absolute inset-0 mx-auto mt-16 h-72 w-72 animate-pulse rounded-full bg-[#00f0ff]/10 blur-3xl" />

          <div className="relative h-[420px] w-[320px] overflow-hidden rounded-3xl border border-[#00f0ff]/40 bg-black/30 shadow-[0_0_40px_rgba(0,240,255,0.35)] md:h-[500px] md:w-[380px]">
            <Image
              src="/profile-ai.png"
              alt="Mahesh Injarapu AI Portrait"
              fill
              priority
              className="object-cover"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-[#00f0ff]/10" />
          </div>

          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 opacity-40">
            <ThreeHero />
          </div>
        </motion.div>
      </div>
    </section>
  );
}