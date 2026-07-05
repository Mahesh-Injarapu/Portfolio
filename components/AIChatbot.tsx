"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, Terminal, CornerDownLeft } from "lucide-react";

interface Message {
  sender: "user" | "bot";
  text: string;
  time: string;
}

const SUGGESTIONS = [
  "What projects has he built?",
  "Where does he study?",
  "List his technical skills",
  "How can I contact him?",
];

const BOT_DATABASE: Record<string, string> = {
  greeting: "Greetings, voyager. I am Mahesh's AI agent. Ask me about his projects, skills, education, or how to get in touch!",
  projects: "Mahesh has engineered several high-end tools: 1) AI Air Mouse (OpenCV/MediaPipe gesture control), 2) Jarvis AI Assistant, 3) Placement360 AI portal, 4) QuantumShield X (Post-Quantum security audit scanner), and 5) this responsive 3D Portfolio.",
  education: "Mahesh is pursuing his Bachelor of Technology (B.Tech) in Computer Science Engineering (Artificial Intelligence and Machine Learning) at NRI Institute of Technology, Andhra Pradesh, India.",
  skills: "His stack includes: Python, React, Next.js, Node.js, Express, TypeScript, JavaScript, Git/GitHub, MySQL, MongoDB, OpenCV, and MediaPipe.",
  contact: "You can email Mahesh at maheshinjarapu.dev@gmail.com, connect on GitHub at github.com/Mahesh-Injarapu, or submit the contact form on this page.",
  resume: "You can preview and save a printable PDF of Mahesh's CV in the 'Curriculum Vitae' section right above the footer.",
  default: "System Query Warning: Phrase not fully mapped. Try asking about: 'projects', 'skills', 'education', 'resume', or 'contact'."
};

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: BOT_DATABASE.greeting, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [input, setInput] = useState("");
  const feedEndRef = useRef<HTMLDivElement>(null);

  const getResponse = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes("project") || q.includes("build") || q.includes("work")) {
      return BOT_DATABASE.projects;
    }
    if (q.includes("study") || q.includes("college") || q.includes("education") || q.includes("nri")) {
      return BOT_DATABASE.education;
    }
    if (q.includes("skill") || q.includes("language") || q.includes("tech") || q.includes("stack")) {
      return BOT_DATABASE.skills;
    }
    if (q.includes("contact") || q.includes("email") || q.includes("hire") || q.includes("message")) {
      return BOT_DATABASE.contact;
    }
    if (q.includes("resume") || q.includes("cv") || q.includes("pdf")) {
      return BOT_DATABASE.resume;
    }
    if (q.includes("hi") || q.includes("hello") || q.includes("hey") || q.includes("greet")) {
      return "Hello! How can I assist you in exploring Mahesh's portfolio?";
    }
    return BOT_DATABASE.default;
  };

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Add user message
    const userMsg: Message = { sender: "user", text: textToSend, time };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate thinking state
    setTimeout(() => {
      const botResponseText = getResponse(textToSend);
      const botMsg: Message = { sender: "bot", text: botResponseText, time };
      setMessages((prev) => [...prev, botMsg]);
    }, 800);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  // Scroll to bottom on updates
  useEffect(() => {
    feedEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans">
      {/* Floating Trigger Button */}
      <button
        id="ai-chat-trigger-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="Chat with Mahesh's AI Assistant"
        className="p-4 bg-gradient-to-r from-[#00f0ff] to-[#bd00ff] text-black font-bold rounded-full shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_25px_rgba(189,0,255,0.55)] cursor-pointer hover:scale-105 transition-all flex items-center justify-center relative group"
      >
        {isOpen ? <X className="w-6 h-6 text-black" /> : <MessageSquare className="w-6 h-6 text-black" />}
        
        {/* Glow pulsing aura */}
        <span className="absolute inset-0 rounded-full border border-[#00f0ff] animate-ping opacity-25 pointer-events-none" />
      </button>

      {/* Chat Terminal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 20, stiffness: 260 }}
            className="absolute bottom-20 right-0 w-[90vw] sm:w-[380px] h-[500px] bg-[#0a0a16]/95 border border-white/10 rounded-2xl shadow-[0_0_40px_rgba(0,240,255,0.2)] flex flex-col overflow-hidden backdrop-blur-lg"
          >
            {/* Scanlines overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none z-10" />

            {/* Header */}
            <div className="px-4 py-3.5 bg-white/5 border-b border-white/10 flex items-center justify-between relative">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#00f0ff]" />
                <span className="text-xs font-mono font-bold tracking-widest text-white uppercase">MAHESH_AI_SYS v1.0</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-mono text-emerald-500 uppercase font-bold">ONLINE</span>
              </div>
            </div>

            {/* Chat Transcript Feed */}
            <div className="flex-grow p-4 overflow-y-auto no-scrollbar space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 max-w-[85%] ${msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
                >
                  {msg.sender === "bot" && (
                    <div className="w-8 h-8 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-center text-[#00f0ff] flex-shrink-0">
                      <Bot className="w-4.5 h-4.5" />
                    </div>
                  )}

                  <div className="space-y-1">
                    <div
                      className={`px-4 py-2.5 rounded-2xl text-sm font-light leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-gradient-to-r from-[#bd00ff] to-[#00f0ff]/80 text-black font-semibold rounded-tr-none shadow-[0_0_10px_rgba(0,240,255,0.1)]"
                          : "bg-white/5 border border-white/5 text-gray-300 rounded-tl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[8px] font-mono text-gray-600 block px-1 text-right">
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={feedEndRef} />
            </div>

            {/* Suggestions buttons */}
            <div className="px-4 py-2 flex gap-1.5 overflow-x-auto no-scrollbar border-t border-white/5 bg-black/20">
              {SUGGESTIONS.map((sug) => (
                <button
                  key={sug}
                  onClick={() => handleSend(sug)}
                  className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-[#00f0ff]/10 border border-white/5 hover:border-[#00f0ff]/30 text-gray-400 hover:text-[#00f0ff] font-mono text-[9px] whitespace-nowrap transition-all cursor-pointer"
                >
                  {sug}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSubmit} className="p-3 bg-[#020205] border-t border-white/10 flex gap-2 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask system: 'skills', 'projects'..."
                className="flex-grow px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:border-[#00f0ff] focus:outline-none focus:ring-1 focus:ring-[#00f0ff]/20 text-white font-mono text-xs placeholder-gray-600"
              />
              <button
                type="submit"
                className="px-3 bg-gradient-to-r from-[#00f0ff] to-[#bd00ff] text-black rounded-xl hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center shadow-md"
              >
                <Send className="w-4 h-4 text-black" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
