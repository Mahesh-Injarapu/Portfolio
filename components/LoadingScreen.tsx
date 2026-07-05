"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LOGS = [
  "INITIALIZING SYSTEM CORE...",
  "ESTABLISHING SECURE PROTOCOLS...",
  "LOADING NEURAL NETWORK LAYERS...",
  "MOUNTING THREE.JS GRAPHICS ENGINE...",
  "FETCHING GITHUB CONTRACTS...",
  "SYNCHRONIZING AI AIR MOUSE PARAMETERS...",
  "READY FOR USER INPUT."
];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Progress counter
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 800); // Allow fadeout animation
          }, 400);
          return 100;
        }
        const diff = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + diff, 100);
      });
    }, 80);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    // Log cycler based on progress
    const step = Math.floor(100 / BOOT_LOGS.length);
    const index = Math.min(Math.floor(progress / step), BOOT_LOGS.length - 1);
    setLogIndex(index);
  }, [progress]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#020205] text-[#00f0ff] font-mono px-4"
        >
          {/* Futuristic background grid */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(189,0,255,0.07)_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-40" />

          <div className="w-full max-w-md relative z-10">
            {/* Terminal header */}
            <div className="flex items-center justify-between border border-[#00f0ff]/30 bg-black/40 px-4 py-2 text-xs rounded-t-lg">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                <span>SYSTEM_BOOT.sh</span>
              </span>
              <span className="opacity-50">v2.0.46</span>
            </div>

            {/* Terminal Body */}
            <div className="border-x border-b border-[#00f0ff]/30 bg-black/80 p-6 rounded-b-lg shadow-[0_0_30px_rgba(0,240,255,0.15)] flex flex-col gap-6">
              {/* Profile loading name */}
              <div className="text-center">
                <h1 className="text-xl md:text-2xl font-bold tracking-widest bg-gradient-to-r from-[#00f0ff] via-[#bd00ff] to-[#00ffcc] bg-clip-text text-transparent">
                  MAHESH INJARAPU
                </h1>
                <p className="text-xs text-[#bd00ff] tracking-wide mt-1">PORTFOLIO PROTOCOL INITIALIZED</p>
              </div>

              {/* Progress and percentage */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-[#00ffcc]">INITIALIZING MODULES</span>
                  <span className="text-glow-blue">{progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-900 rounded-full overflow-hidden border border-white/5 relative">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#00f0ff] via-[#bd00ff] to-[#00ffcc] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "easeOut" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                </div>
              </div>

              {/* Console log */}
              <div className="h-16 text-left flex flex-col justify-end">
                <span className="text-[10px] text-gray-500 font-mono">
                  {progress > 15 ? BOOT_LOGS[Math.max(0, logIndex - 1)] : "---"}
                </span>
                <span className="text-xs text-[#00ffcc] font-mono flex items-center gap-1">
                  <span>&gt;</span>
                  <span className="animate-pulse">{BOOT_LOGS[logIndex]}</span>
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
