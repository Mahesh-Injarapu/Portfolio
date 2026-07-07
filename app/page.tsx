"use client";

import Background from "@/components/Background";
import MouseFollower from "@/components/MouseFollower";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Services from "@/components/Services";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import GithubSection from "@/components/Github";
import Achievements from "@/components/Achievements";
import Certificates from "@/components/Certificates";
import Testimonials from "@/components/Testimonials";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

import AudioEngine from "@/components/AudioEngine";
import FloatingDock from "@/components/FloatingDock";
import AIChatbot from "@/components/AIChatbot";
import CommandPalette from "@/components/CommandPalette";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#020205] text-[#e2e8f0]">
      <MouseFollower />

      <CommandPalette />
      <AudioEngine />
      <AIChatbot />
      <FloatingDock />

      <Background />
      <div className="noise-bg" />

      <Navbar />

      <Hero />
      <About />
      <Education />
      <Skills />
      <Services />
      <TechStack />
      <Projects />
      <GithubSection />
      <Achievements />
      <Certificates />
      <Testimonials />
      <Resume />
      <Contact />
      <Footer />
    </main>
  );
}