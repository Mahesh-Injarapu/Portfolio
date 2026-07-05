"use client";

import { useEffect, useState, useRef, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Compass, Palette, Terminal, FileText, Sparkles, Keyboard } from "lucide-react";

interface CommandItem {
  id: string;
  title: string;
  category: string;
  shortcut: string;
  icon: any;
  action: () => void;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleScrollTo = (id: string) => {
    setIsOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleSetTheme = (primaryColor: string, glowColor: string) => {
    setIsOpen(false);
    document.documentElement.style.setProperty("--accent-primary", primaryColor);
    document.documentElement.style.setProperty("--accent-glow", glowColor);
  };

  const handleTriggerChat = () => {
    setIsOpen(false);
    const chatBtn = document.getElementById("ai-chat-trigger-btn");
    if (chatBtn) chatBtn.click();
  };

  const handlePrintResume = () => {
    setIsOpen(false);
    window.print();
  };

  const commands: CommandItem[] = [
    // Sections
    { id: "nav-about", title: "Scroll to About Me", category: "Navigation", shortcut: "A", icon: Compass, action: () => handleScrollTo("about") },
    { id: "nav-skills", title: "Scroll to Skills", category: "Navigation", shortcut: "S", icon: Compass, action: () => handleScrollTo("skills") },
    { id: "nav-projects", title: "Scroll to Selected Works", category: "Navigation", shortcut: "P", icon: Compass, action: () => handleScrollTo("projects") },
    { id: "nav-contact", title: "Scroll to Contact Form", category: "Navigation", shortcut: "C", icon: Compass, action: () => handleScrollTo("contact") },
    
    // Themes
    { id: "theme-cyan", title: "Apply Neon Cyan Theme", category: "Accent Palette", shortcut: "T1", icon: Palette, action: () => handleSetTheme("#00f0ff", "rgba(0,240,255,0.4)") },
    { id: "theme-purple", title: "Apply Cyber Purple Theme", category: "Accent Palette", shortcut: "T2", icon: Palette, action: () => handleSetTheme("#bd00ff", "rgba(189,0,255,0.4)") },
    { id: "theme-green", title: "Apply Electric Green Theme", category: "Accent Palette", shortcut: "T3", icon: Palette, action: () => handleSetTheme("#00ffcc", "rgba(0,255,204,0.4)") },

    // Special Commands
    { id: "cmd-chat", title: "Trigger AI Assistant Terminal", category: "Special Systems", shortcut: "O", icon: Terminal, action: handleTriggerChat },
    { id: "cmd-resume", title: "Print / Save CV Resume", category: "Special Systems", shortcut: "R", icon: FileText, action: handlePrintResume },
  ];

  // Filter commands by search text
  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  // Sync index boundaries on filter
  useEffect(() => {
    setActiveIndex(0);
  }, [search]);

  // Global listener for Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Listen to keyboard navigation in modal
  const handleModalKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!isOpen) return;

    if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev === filteredCommands.length - 1 ? 0 : prev + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev === 0 ? filteredCommands.length - 1 : prev - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCommands[activeIndex]) {
        filteredCommands[activeIndex].action();
      }
    }
  };

  return (
    <>
      {/* Tiny floating search trigger badge in top right header info */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-6 z-40 px-3 py-1.5 bg-[#0a0a16]/80 hover:bg-[#0a0a16] border border-white/5 hover:border-[#00f0ff]/30 rounded-lg text-gray-500 hover:text-white flex items-center gap-2 cursor-pointer text-xs font-mono backdrop-blur-md transition-all shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
      >
        <Search className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Search Commands</span>
        <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10 text-[9px] text-gray-400">Ctrl K</kbd>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4 font-sans">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-[#020205]/85 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              ref={modalRef}
              onKeyDown={handleModalKeyDown}
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-lg bg-[#0a0a16]/95 border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_35px_rgba(0,240,255,0.15)] z-10 flex flex-col"
            >
              {/* Search Bar Input */}
              <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10 bg-white/5">
                <Search className="w-5 h-5 text-gray-500" />
                <input
                  autoFocus
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search actions or command palette..."
                  className="flex-grow bg-transparent text-white font-mono text-sm placeholder-gray-600 focus:outline-none"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-2 py-1 border border-white/10 rounded text-[9px] text-gray-500 font-mono"
                >
                  ESC
                </button>
              </div>

              {/* Commands List */}
              <div className="max-h-[300px] overflow-y-auto no-scrollbar p-2">
                {filteredCommands.length > 0 ? (
                  Object.entries(
                    filteredCommands.reduce((groups, item) => {
                      const group = item.category;
                      if (!groups[group]) groups[group] = [];
                      groups[group].push(item);
                      return groups;
                    }, {} as Record<string, CommandItem[]>)
                  ).map(([cat, list]) => (
                    <div key={cat} className="space-y-1 my-2">
                      <span className="text-[9px] font-mono text-gray-600 uppercase tracking-widest px-3 block">
                        {cat}
                      </span>
                      {list.map((cmd) => {
                        const Icon = cmd.icon;
                        const idx = filteredCommands.findIndex((c) => c.id === cmd.id);
                        const isCurrent = idx === activeIndex;

                        return (
                          <div
                            key={cmd.id}
                            onClick={cmd.action}
                            onMouseEnter={() => setActiveIndex(idx)}
                            className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
                              isCurrent
                                ? "bg-white/5 border-l-2 border-[#00f0ff] text-white"
                                : "text-gray-400"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Icon className={`w-4 h-4 ${isCurrent ? "text-[#00f0ff]" : "text-gray-600"}`} />
                              <span className="text-xs font-mono font-medium">{cmd.title}</span>
                            </div>
                            <span className="px-1.5 py-0.5 bg-black/40 text-[9px] font-mono rounded border border-white/5 text-gray-500">
                              {cmd.shortcut}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-600 font-mono text-xs">
                    No matching commands found.
                  </div>
                )}
              </div>

              {/* Footer Guide info */}
              <div className="px-4 py-2.5 bg-black/40 border-t border-white/5 flex justify-between items-center text-[9px] font-mono text-gray-600">
                <span className="flex items-center gap-1">
                  <Keyboard className="w-3.5 h-3.5" />
                  Use arrows to navigate list
                </span>
                <span>Press Enter to launch</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
