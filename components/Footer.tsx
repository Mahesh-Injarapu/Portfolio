"use client";

import { motion } from "framer-motion";
import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#020205] border-t border-white/5 py-12 px-6 md:px-12 text-gray-500 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Logo and Copyright */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <button 
            onClick={scrollToTop}
            className="text-lg font-black tracking-tighter text-white flex items-center gap-1.5 cursor-pointer"
          >
            <span className="w-2.5 h-2.5 bg-gradient-to-tr from-[#00f0ff] to-[#bd00ff] rounded-sm" />
            <span>MAHESH</span>
            <span className="text-[#00f0ff] font-light">.DEV</span>
          </button>
          <p className="text-xs text-gray-600 tracking-wide font-light">
            © {new Date().getFullYear()} Mahesh Injarapu. All rights reserved.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-6 text-xs uppercase font-mono tracking-wider font-semibold">
          {[
            { label: "About", id: "about" },
            { label: "Skills", id: "skills" },
            { label: "Projects", id: "projects" },
            { label: "Contact", id: "contact" }
          ].map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="text-gray-500 hover:text-[#00f0ff] transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Socials & Top Trigger */}
        <div className="flex items-center gap-6">
          <div className="flex gap-4">
            <a
              href="https://github.com/Mahesh-Injarapu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <Github className="w-4.5 h-4.5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <Linkedin className="w-4.5 h-4.5" />
            </a>
            <a
              href="mailto:maheshinjarapu.dev@gmail.com"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <Mail className="w-4.5 h-4.5" />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="p-3 bg-white/5 border border-white/5 hover:border-[#00f0ff]/50 text-[#00f0ff] hover:text-white rounded-full transition-all cursor-pointer shadow-[0_0_8px_rgba(0,240,255,0.1)] hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
        
      </div>
    </footer>
  );
}
