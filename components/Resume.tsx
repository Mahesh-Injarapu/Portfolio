"use client";

import { motion } from "framer-motion";
import { Download, FileText, CheckCircle, ExternalLink, Printer } from "lucide-react";

export default function Resume() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="resume" className="relative py-28 px-6 md:px-12 bg-[#020205] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-[#00f0ff]/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16 space-y-2">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            CURRICULUM <span className="bg-gradient-to-r from-[#00f0ff] to-[#bd00ff] bg-clip-text text-transparent text-glow-blue">VITAE</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#00f0ff] to-[#bd00ff] mx-auto rounded-full" />
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: CV Overview details (5 Columns) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-5 flex flex-col justify-between space-y-6"
          >
            <div className="glass-panel p-6 md:p-8 rounded-2xl border border-white/5 space-y-6 flex-grow flex flex-col justify-between">
              <div className="space-y-4">
                <div className="p-3 bg-[#bd00ff]/10 rounded-xl text-[#bd00ff] self-start w-fit">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">Professional Summary</h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">
                  A motivated and research-driven Computer Science Engineering student specializing in AI & ML. Adept at building clean responsive web apps using React, Next.js, and Node.js, and developing tools using Python computer vision frameworks.
                </p>
              </div>

              {/* Checklist */}
              <div className="space-y-3.5 my-6">
                {[
                  "Specialized in AI & Machine Learning",
                  "Proficient in Python & Full-Stack JS",
                  "Experienced with OpenCV & MediaPipe",
                  "Active Hackathon Innovator"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-gray-300 font-medium">
                    <CheckCircle className="w-4 h-4 text-[#00ffcc] flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-white/5">
                <button
                  onClick={handlePrint}
                  className="px-5 py-3 bg-gradient-to-r from-[#00f0ff] to-[#bd00ff] text-black font-extrabold rounded-lg flex items-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.35)] transition-all hover:shadow-[0_0_20px_rgba(189,0,255,0.45)] cursor-pointer text-sm"
                >
                  <Printer className="w-4.5 h-4.5" />
                  <span>Print / Save PDF</span>
                </button>
                
                <a
                  href="https://github.com/Mahesh-Injarapu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 glass-card rounded-lg border border-white/5 hover:border-white/20 text-white font-semibold flex items-center gap-2 transition-all text-sm"
                >
                  <span>Verify Credentials</span>
                  <ExternalLink className="w-4 h-4 text-gray-500" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: CV Preview Panel (7 Columns) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7"
          >
            {/* Interactive styled document wrapper */}
            <div className="w-full bg-[#0a0a16] border border-white/5 rounded-2xl p-6 md:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.4)] relative max-h-[600px] overflow-y-auto no-scrollbar font-sans text-left print:bg-white print:text-black">
              {/* Cover lines */}
              <div className="flex justify-between items-start border-b border-white/5 pb-6 mb-6">
                <div>
                  <h1 className="text-2xl font-black text-white tracking-wide">MAHESH INJARAPU</h1>
                  <p className="text-[#00f0ff] font-mono text-xs tracking-wider mt-1.5 uppercase font-semibold">AI Developer & Student</p>
                </div>
                <div className="text-right text-[10px] font-mono text-gray-500 space-y-0.5">
                  <p>maheshinjarapu2007@gmail.com</p>
                  <p>Andhra Pradesh, India</p>
                  <p>github.com/Mahesh-Injarapu</p>
                </div>
              </div>

              {/* Education section */}
              <div className="space-y-4 mb-6">
                <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest border-b border-white/5 pb-1">Education</h4>
                <div className="flex justify-between items-start text-sm">
                  <div>
                    <h5 className="font-bold text-gray-200">Dr.RVR NRI Institute of Technology Deemed to be University</h5>
                    <p className="text-xs text-gray-400">B.Tech – Computer Science (Artificial Intelligence & Machine Learning)</p>
                  </div>
                  <span className="text-[10px] font-mono text-gray-500">2022 - Present</span>
                </div>
              </div>

              {/* Tech stack */}
              <div className="space-y-3 mb-6">
                <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest border-b border-white/5 pb-1">Technical Competencies</h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="font-mono text-gray-500 block uppercase tracking-wider text-[9px]">Languages</span>
                    <span className="text-gray-300">Python, JavaScript, TypeScript, HTML5, CSS3, SQL</span>
                  </div>
                  <div>
                    <span className="font-mono text-gray-500 block uppercase tracking-wider text-[9px]">Frameworks</span>
                    <span className="text-gray-300">React, Next.js, Node.js, Express, OpenCV, MediaPipe</span>
                  </div>
                </div>
              </div>

              {/* Selected Projects */}
              <div className="space-y-4">
                <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest border-b border-white/5 pb-1">Selected Projects</h4>
                
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <h5 className="font-bold text-gray-200">AI Air Mouse</h5>
                    <span className="text-[10px] font-mono text-gray-500">Python & Computer Vision</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed font-light">
                    Built a virtual computer mouse interface that leverages real-time webcam frame coordinates and Skeletal Tracking points.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <h5 className="font-bold text-gray-200">Placement360 AI</h5>
                    <span className="text-[10px] font-mono text-gray-500">Next.js & MySQL</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed font-light">
                    Developed a placement training assistant evaluating resumes and scoring candidate speech inputs in mock interviews.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
