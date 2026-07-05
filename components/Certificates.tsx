"use client";

import { motion } from "framer-motion";
import { Award, ShieldCheck, Calendar, ExternalLink } from "lucide-react";

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  link: string;
  color: string;
}

const CERTIFICATES_DATA: Certificate[] = [
  {
    title: "Python Programming & Data Structures",
    issuer: "HackerRank / Coursera",
    date: "Dec 2023",
    credentialId: "CERT-PY-92041",
    link: "https://github.com/Mahesh-Injarapu",
    color: "#3776ab"
  },
  {
    title: "AI & Machine Learning Foundations",
    issuer: "Dr.RVR NRI Institute of Technology Deemed to be University",
    date: "May 2024",
    credentialId: "CERT-AIML-77402",
    link: "https://github.com/Mahesh-Injarapu",
    color: "#bd00ff"
  },
  {
    title: "Git & GitHub Version Control Training",
    issuer: "GitHub Global Campus Partner",
    date: "Oct 2023",
    credentialId: "CERT-GIT-38192",
    link: "https://github.com/Mahesh-Injarapu",
    color: "#00ffcc"
  },
  {
    title: "Full Stack Web Development",
    issuer: "FreeCodeCamp / Udemy",
    date: "Jul 2024",
    credentialId: "CERT-FS-55109",
    link: "https://github.com/Mahesh-Injarapu",
    color: "#00f0ff"
  }
];

function CertificateCard({ cert }: { cert: Certificate }) {
  return (
    <div className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col justify-between h-[280px] relative overflow-hidden group">
      {/* Glow highlight */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${cert.color} 0%, transparent 60%)`
        }}
      />
      
      {/* Decorative top accent line */}
      <div 
        className="absolute top-0 left-0 w-[4px] h-full transition-all duration-300"
        style={{ backgroundColor: cert.color }}
      />

      {/* Holographic badge seal in background */}
      <div className="absolute -right-8 -bottom-8 opacity-5 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none">
        <Award className="w-40 h-40" style={{ color: cert.color }} />
      </div>

      <div className="space-y-4 relative z-10">
        {/* Certificate Header */}
        <div className="flex items-center justify-between">
          <div 
            className="p-2.5 rounded-lg border border-white/10 flex items-center justify-center"
            style={{ 
              color: cert.color, 
              backgroundColor: `${cert.color}0a` 
            }}
          >
            <ShieldCheck className="w-5.5 h-5.5" />
          </div>
          <span className="text-[9px] font-mono text-gray-500 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{cert.date}</span>
          </span>
        </div>

        {/* Title & Issuer */}
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-white group-hover:text-white transition-colors leading-snug">
            {cert.title}
          </h3>
          <p className="text-gray-400 text-xs font-medium">{cert.issuer}</p>
        </div>
      </div>

      {/* Card Footer: Credential ID and Link */}
      <div className="pt-4 border-t border-white/5 flex items-center justify-between relative z-10">
        <div>
          <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest block">Credential ID</span>
          <span className="text-xs font-mono text-gray-300 font-bold">{cert.credentialId}</span>
        </div>

        <a
          href={cert.link}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-white/5 border border-white/5 hover:border-white/20 text-gray-400 hover:text-white transition-all flex items-center justify-center"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

export default function Certificates() {
  return (
    <section id="certificates" className="relative py-28 px-6 md:px-12 bg-[#020205] overflow-hidden">
      {/* Background radial spotlights */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#00ffcc]/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-20 space-y-2">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            CREDENTIALS & <span className="bg-gradient-to-r from-[#00f0ff] to-[#bd00ff] bg-clip-text text-transparent text-glow-blue">CERTIFICATES</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#00f0ff] to-[#bd00ff] mx-auto rounded-full" />
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CERTIFICATES_DATA.map((cert) => (
            <CertificateCard key={cert.credentialId} cert={cert} />
          ))}
        </div>
      </div>
    </section>
  );
}
