"use client";

import { motion } from "framer-motion";
import { Github, GitPullRequest, Star, GitFork, BookOpen, Clock, Activity } from "lucide-react";

const TOP_LANGUAGES = [
  { name: "Python", percentage: 48, color: "#3776ab" },
  { name: "JavaScript", percentage: 28, color: "#f7df1e" },
  { name: "TypeScript", percentage: 14, color: "#3178c6" },
  { name: "C++ / Other", percentage: 10, color: "#bd00ff" },
];

const PINNED_REPOS = [
  {
    name: "ai-air-mouse",
    description: "Gesture-controlled computer mouse utility utilizing computer vision frameworks and custom pointer filters.",
    language: "Python",
    langColor: "#3776ab",
    stars: 12,
    forks: 4,
  },
  {
    name: "Placement360-AI",
    description: "Enterprise placement ecosystem assessing mock interviews and optimizing resumes for students.",
    language: "JavaScript",
    langColor: "#f7df1e",
    stars: 18,
    forks: 6,
  }
];

const LATEST_COMMITS = [
  { repo: "ai-air-mouse", message: "refactor: optimize MediaPipe coordinate filters", date: "2 hours ago" },
  { repo: "Placement360-AI", message: "feat: add mock interview score calculations", date: "1 day ago" },
  { repo: "QuantumShield-X", message: "docs: update migration timeline logs", date: "3 days ago" },
];

export default function GithubSection() {
  // Generate mock contribution grid data (53 weeks * 7 days = 371 squares)
  // Let's generate a list of intensity numbers (0 to 4) representing green colors
  const contributionGrid = Array.from({ length: 147 }, (_, i) => {
    // Generate organic-looking clusters
    const cluster = Math.sin(i * 0.1) * Math.cos(i * 0.05);
    const val = Math.floor(Math.abs(cluster) * 5);
    return Math.min(val, 4);
  });

  const getIntensityColor = (intensity: number) => {
    switch (intensity) {
      case 1: return "bg-emerald-900/40 border-emerald-900/10";
      case 2: return "bg-emerald-700/60 border-emerald-700/20";
      case 3: return "bg-emerald-500/80 border-emerald-500/30";
      case 4: return "bg-emerald-400 border-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]";
      default: return "bg-white/5 border-white/5";
    }
  };

  return (
    <section id="github" className="relative py-28 px-6 md:px-12 bg-[#020205] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#00f0ff]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-20 space-y-2">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            GITHUB <span className="bg-gradient-to-r from-[#00f0ff] to-[#bd00ff] bg-clip-text text-transparent text-glow-blue">ACTIVITY</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#bd00ff] to-[#00f0ff] mx-auto rounded-full" />
        </div>

        {/* Dashboard Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Stats & Languages (5 Columns) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-5 space-y-8"
          >
            {/* Stats Card */}
            <div className="glass-card p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,240,255,0.03)_0%,transparent_60%)]" />
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-[#00f0ff]/10 rounded-lg text-[#00f0ff]">
                    <Github className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Mahesh-Injarapu</h3>
                    <p className="text-[10px] font-mono text-gray-500 mt-0.5">DEV STATUS: ACTIVE</p>
                  </div>
                </div>
                <a
                  href="https://github.com/Mahesh-Injarapu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 glass-panel text-[10px] font-mono text-gray-300 hover:text-white border border-white/10 hover:border-[#00f0ff]/30 rounded-md transition-all uppercase font-semibold"
                >
                  Follow
                </a>
              </div>

              {/* Numerical Metrics */}
              <div className="grid grid-cols-3 gap-4 border-t border-b border-white/5 py-5 my-5">
                <div className="text-center">
                  <p className="text-2xl font-black text-[#00f0ff]">25+</p>
                  <p className="text-[9px] font-mono text-gray-400 mt-1 uppercase tracking-wider">Repositories</p>
                </div>
                <div className="text-center border-l border-r border-white/5">
                  <p className="text-2xl font-black text-[#bd00ff]">480+</p>
                  <p className="text-[9px] font-mono text-gray-400 mt-1 uppercase tracking-wider">Commits</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-black text-[#00ffcc]">30+</p>
                  <p className="text-[9px] font-mono text-gray-400 mt-1 uppercase tracking-wider">Stars Earned</p>
                </div>
              </div>

              {/* Top Languages */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Top Languages</h4>
                <div className="space-y-3">
                  {TOP_LANGUAGES.map((lang) => (
                    <div key={lang.name} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-gray-300">{lang.name}</span>
                        <span className="font-mono text-gray-400">{lang.percentage}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-900 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${lang.percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                          style={{ backgroundColor: lang.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contributions & Pinned (7 Columns) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7 space-y-8"
          >
            {/* Contribution heat map placeholder */}
            <div className="glass-panel p-6 rounded-2xl border border-white/5 relative">
              <div className="flex items-center justify-between mb-5 border-b border-white/5 pb-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#00ffcc]" />
                  <span>Contribution Heatmap</span>
                </h4>
                <span className="text-[9px] font-mono text-gray-500">PAST 5 MONTHS ACTIVITY LOG</span>
              </div>

              {/* Grid block */}
              <div className="grid grid-cols-[repeat(21,1fr)] gap-1.5 no-scrollbar overflow-x-auto pb-2">
                {contributionGrid.map((intensity, idx) => (
                  <div
                    key={idx}
                    className={`aspect-square w-full rounded-[2px] border ${getIntensityColor(intensity)}`}
                  />
                ))}
              </div>

              <div className="flex justify-between items-center text-[8px] font-mono text-gray-500 mt-4">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span className="flex items-center gap-1">
                  <span>Less</span>
                  <span className="w-2.5 h-2.5 bg-white/5 border border-white/5 rounded-[1px]" />
                  <span className="w-2.5 h-2.5 bg-emerald-900/40 border-emerald-900/10 rounded-[1px]" />
                  <span className="w-2.5 h-2.5 bg-emerald-700/60 border-emerald-700/20 rounded-[1px]" />
                  <span className="w-2.5 h-2.5 bg-emerald-500/80 border-emerald-500/30 rounded-[1px]" />
                  <span className="w-2.5 h-2.5 bg-emerald-400 rounded-[1px]" />
                  <span>More</span>
                </span>
              </div>
            </div>

            {/* Pinned Repos Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PINNED_REPOS.map((repo) => (
                <div key={repo.name} className="glass-card p-5 rounded-xl border border-white/5 flex flex-col justify-between h-[155px] group">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-white font-bold text-base group-hover:text-[#00f0ff] transition-colors">
                      <BookOpen className="w-4.5 h-4.5 text-gray-400" />
                      <span>{repo.name}</span>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 font-light">
                      {repo.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-gray-500 pt-3 border-t border-white/5">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: repo.langColor }} />
                      <span className="text-gray-300">{repo.language}</span>
                    </span>
                    <span className="flex items-center gap-3">
                      <span className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 text-[#ffb900]" />
                        <span>{repo.stars}</span>
                      </span>
                      <span className="flex items-center gap-0.5">
                        <GitFork className="w-3 h-3 text-[#bd00ff]" />
                        <span>{repo.forks}</span>
                      </span>
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Latest Commits Feed */}
            <div className="glass-panel p-6 rounded-2xl border border-white/5">
              <h4 className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-4">Latest Activity Log</h4>
              <div className="space-y-4">
                {LATEST_COMMITS.map((log, idx) => (
                  <div key={idx} className="flex justify-between items-start gap-4 text-xs font-mono border-b border-white/5 pb-3 last:border-b-0 last:pb-0">
                    <div className="space-y-1">
                      <span className="text-[#00f0ff] font-bold">Mahesh-Injarapu/{log.repo}</span>
                      <p className="text-gray-400 font-light">{log.message}</p>
                    </div>
                    <span className="text-[10px] text-gray-500 flex-shrink-0 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{log.date}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
