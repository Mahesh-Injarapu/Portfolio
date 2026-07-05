"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
}

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    name: "Dr. K. Srinivasa Rao",
    role: "Professor & HOD of CSE",
    company: "NRI Institute of Technology",
    quote: "Mahesh shows outstanding problem-solving skills and a real passion for Artificial Intelligence. His work on computer vision applications like the AI Air Mouse demonstrates strong engineering capability.",
    rating: 5
  },
  {
    name: "Amit Kumar Sharma",
    role: "Hackathon Organizer",
    company: "Smart City Hackathon 2024",
    quote: "Mahesh is a solid team player who stays calm under pressure. He managed to stitch the frontend components to our backend server flawlessly during the 24-hour development sprints.",
    rating: 5
  },
  {
    name: "Sai Kiran Verma",
    role: "Project Partner / Developer",
    company: "Placement360 AI Team",
    quote: "Collaborating with Mahesh on Placement360 AI was a breeze. He structured the MySQL schemas cleanly and maintained type-safety, which saved us hours during integration testing.",
    rating: 5
  }
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    // Auto-advance testimonials every 8 seconds
    const timer = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(timer);
  }, [index]);

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev === TESTIMONIALS_DATA.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS_DATA[index];

  // Motion variants for slide animation
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0
    })
  };

  return (
    <section id="testimonials" className="relative py-28 px-6 md:px-12 bg-[#020205] overflow-hidden border-t border-b border-white/5">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#bd00ff]/3 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16 space-y-2">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            PEER <span className="bg-gradient-to-r from-[#00f0ff] to-[#bd00ff] bg-clip-text text-transparent text-glow-blue">FEEDBACK</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#bd00ff] to-[#00f0ff] mx-auto rounded-full" />
        </div>

        {/* Carousel Slider Panel */}
        <div className="relative min-h-[300px] flex items-center">
          
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full glass-panel p-8 md:p-12 rounded-3xl border border-white/5 relative flex flex-col justify-between"
            >
              {/* Quote Mark Decoration */}
              <div className="absolute top-6 right-8 text-white/5 pointer-events-none">
                <Quote className="w-24 h-24 rotate-180" />
              </div>

              {/* Quote Content */}
              <div className="space-y-6 relative z-10">
                {/* Rating */}
                <div className="flex gap-1">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 fill-[#ffb900] stroke-[#ffb900] shadow-sm" />
                  ))}
                </div>

                <p className="text-gray-300 text-lg md:text-xl leading-relaxed italic font-light">
                  "{current.quote}"
                </p>
              </div>

              {/* User Bio */}
              <div className="mt-8 flex items-center gap-4 border-t border-white/5 pt-6 relative z-10">
                {/* Initials Circle */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#00f0ff] to-[#bd00ff] p-0.5 shadow-[0_0_12px_rgba(0,240,255,0.25)] flex-shrink-0">
                  <div className="w-full h-full rounded-full bg-[#0a0a16] flex items-center justify-center text-sm font-extrabold text-white">
                    {current.name.split(" ").slice(-2).map(w => w[0]).join("")}
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-bold text-white">{current.name}</h4>
                  <p className="text-xs text-[#00ffcc] font-mono tracking-wider mt-0.5">
                    {current.role} – <span className="text-gray-400">{current.company}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel controls */}
        <div className="flex justify-center items-center gap-6 mt-8">
          <button
            onClick={handlePrev}
            className="p-3 bg-white/5 border border-white/5 hover:border-[#00f0ff]/30 hover:bg-white/10 text-white rounded-full transition-all cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex gap-2">
            {TESTIMONIALS_DATA.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                  index === i ? "bg-[#00f0ff] w-6 shadow-[0_0_8px_#00f0ff]" : "bg-gray-700"
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-3 bg-white/5 border border-white/5 hover:border-[#bd00ff]/30 hover:bg-white/10 text-white rounded-full transition-all cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
