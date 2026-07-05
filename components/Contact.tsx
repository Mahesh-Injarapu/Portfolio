"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Github, Linkedin, Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }

    setStatus("sending");
    // Simulate high-tech transmission
    setTimeout(() => {
      setStatus("success");
      setFormState({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="relative py-28 px-6 md:px-12 bg-[#020205] overflow-hidden">
      {/* Background spotlights */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#bd00ff]/3 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#00f0ff]/5 rounded-full blur-[115px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-20 space-y-2">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            GET IN <span className="bg-gradient-to-r from-[#00f0ff] to-[#bd00ff] bg-clip-text text-transparent text-glow-blue">TOUCH</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#00f0ff] to-[#bd00ff] mx-auto rounded-full" />
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact details card (5 Columns) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/5 space-y-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,240,255,0.03)_0%,transparent_60%)]" />
              
              <div className="space-y-3 relative z-10">
                <h3 className="text-2xl font-black text-white">Let's build something epic</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">
                  Have a project inquiry, research proposal, or just want to say hi? Fill out the secure form or connect directly via social platforms.
                </p>
              </div>

              {/* Detail channels */}
              <div className="space-y-5 relative z-10">
                <a 
                  href="mailto:maheshinjarapu.dev@gmail.com" 
                  className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 hover:border-[#00f0ff]/30 rounded-xl transition-all group"
                >
                  <div className="p-3 bg-[#00f0ff]/10 rounded-lg text-[#00f0ff] group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block">Email Address</span>
                    <span className="text-sm font-semibold text-white group-hover:text-[#00f0ff] transition-colors">maheshinjarapu.dev@gmail.com</span>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-xl">
                  <div className="p-3 bg-[#bd00ff]/10 rounded-lg text-[#bd00ff]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block">Office Location</span>
                    <span className="text-sm font-semibold text-white">Andhra Pradesh, India</span>
                  </div>
                </div>
              </div>

              {/* Social grid */}
              <div className="space-y-4 pt-6 border-t border-white/5 relative z-10">
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block">Secure Social Integrations</span>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/Mahesh-Injarapu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 bg-white/5 border border-white/5 hover:border-[#00f0ff] rounded-xl text-gray-400 hover:text-white flex items-center justify-center gap-2 transition-all font-mono text-xs"
                  >
                    <Github className="w-4 h-4 text-[#00f0ff]" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 bg-white/5 border border-white/5 hover:border-[#bd00ff] rounded-xl text-gray-400 hover:text-white flex items-center justify-center gap-2 transition-all font-mono text-xs"
                  >
                    <Linkedin className="w-4 h-4 text-[#bd00ff]" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form Panel (7 Columns) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit} className="glass-panel p-6 md:p-8 rounded-2xl border border-white/5 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#00f0ff] to-[#bd00ff]" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest font-semibold">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter name"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-[#00f0ff] focus:outline-none focus:ring-1 focus:ring-[#00f0ff]/30 text-white font-light text-sm transition-all"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest font-semibold">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter email"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-[#bd00ff] focus:outline-none focus:ring-1 focus:ring-[#bd00ff]/30 text-white font-light text-sm transition-all"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest font-semibold">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  placeholder="Enter subject"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-[#00ffcc] focus:outline-none focus:ring-1 focus:ring-[#00ffcc]/30 text-white font-light text-sm transition-all"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest font-semibold">Message *</label>
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Enter message..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-[#00f0ff] focus:outline-none focus:ring-1 focus:ring-[#00f0ff]/30 text-white font-light text-sm transition-all resize-none"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-4 bg-gradient-to-r from-[#00f0ff] to-[#bd00ff] hover:from-[#bd00ff] hover:to-[#00f0ff] text-black font-extrabold rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.35)] flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 text-sm"
              >
                {status === "idle" && (
                  <>
                    <span>Transmit Encrypted Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
                {status === "sending" && (
                  <span className="font-mono text-xs flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-black rounded-full animate-ping" />
                    TRANSMITTING DATA PROTOCOL...
                  </span>
                )}
                {status === "success" && (
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-black" />
                    <span>PAYLOAD DELIVERED SECURELY</span>
                  </span>
                )}
                {status === "error" && (
                  <span className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-black animate-bounce" />
                    <span>FILL IN REQUIRED FIELDS</span>
                  </span>
                )}
              </button>
            </form>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
