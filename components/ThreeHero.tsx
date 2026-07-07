"use client";

export default function ThreeHero() {
  return (
    <div className="relative flex h-full min-h-[220px] w-full items-center justify-center overflow-hidden">
      <div className="absolute h-40 w-40 animate-pulse rounded-full bg-[#bd00ff]/50 blur-2xl" />
      <div className="absolute h-56 w-56 rounded-full border border-[#00f0ff]/40 animate-spin-slow" />
      <div className="absolute h-36 w-36 rounded-full border border-[#00ffcc]/30 animate-ping" />

      <div className="relative h-28 w-28 rounded-3xl border border-[#00f0ff]/50 bg-gradient-to-br from-[#00f0ff]/30 via-[#bd00ff]/30 to-[#00ffcc]/20 shadow-[0_0_40px_rgba(0,240,255,0.45)] backdrop-blur-md animate-float">
        <div className="absolute inset-4 rounded-2xl border border-white/20" />
      </div>
    </div>
  );
}