"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Education", id: "education" },
  { label: "Skills", id: "skills" },
  { label: "Services", id: "services" },
  { label: "Projects", id: "projects" },
  { label: "GitHub", id: "github" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll handler for background glow/shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll spy implementation
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px", // Detect when section is in middle of viewport
      threshold: 0.1,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    NAV_LINKS.forEach((link) => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? "py-4 bg-[#020205]/80 backdrop-blur-md border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("home")}
            className="text-xl md:text-2xl font-black tracking-tighter text-white flex items-center gap-1.5 cursor-pointer"
          >
            <span className="w-3 h-3 bg-gradient-to-tr from-[#00f0ff] to-[#bd00ff] rounded-sm animate-pulse" />
            <span>MAHESH</span>
            <span className="text-[#00f0ff] font-light">.Portfolio</span>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`relative px-1.5 py-1 text-sm font-semibold tracking-wider uppercase transition-colors cursor-pointer ${
                  activeSection === link.id ? "text-[#00f0ff]" : "text-gray-400 hover:text-white"
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.span
                    layoutId="activeUnderline"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#00f0ff] to-[#bd00ff] shadow-[0_0_8px_#00f0ff]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Desktop Socials */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href="https://github.com/Mahesh-Injarapu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#00f0ff] transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#bd00ff] transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:maheshinjarapu.dev@gmail.com"
              className="text-gray-400 hover:text-[#00ffcc] transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Mobile Hamburguer Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[72px] bg-[#020205]/95 backdrop-blur-lg z-30 lg:hidden flex flex-col p-8 border-b border-white/5"
          >
            <div className="flex flex-col gap-6 mt-8">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-xl font-bold tracking-widest uppercase text-left py-2 border-b border-white/5 ${
                    activeSection === link.id ? "text-[#00f0ff] pl-2 border-[#00f0ff]/50" : "text-gray-400"
                  } transition-all`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="mt-auto flex justify-center gap-8 py-8 border-t border-white/5">
              <a
                href="https://github.com/Mahesh-Injarapu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#00f0ff] p-2 bg-white/5 rounded-full"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#bd00ff] p-2 bg-white/5 rounded-full"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="mailto:maheshinjarapu.dev@gmail.com"
                className="text-gray-400 hover:text-[#00ffcc] p-2 bg-white/5 rounded-full"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
