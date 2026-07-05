"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioEngine() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const initAudio = () => {
    if (audioCtxRef.current) return;

    // Create browser audio context
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;

    // Master volume gain
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.0, ctx.currentTime); // start silent for fade in
    masterGain.connect(ctx.destination);
    gainNodeRef.current = masterGain;

    // Low pass filter to keep it deep and ambient
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(300, ctx.currentTime);
    filter.connect(masterGain);

    // Oscillator 1: Main deep note (A2 - 110Hz)
    const osc1 = ctx.createOscillator();
    osc1.type = "triangle";
    osc1.frequency.setValueAtTime(110, ctx.currentTime);
    osc1.connect(filter);
    osc1.start();
    osc1Ref.current = osc1;

    // Oscillator 2: Perfect fifth harmonic (E3 - 165Hz)
    const osc2 = ctx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(165, ctx.currentTime);
    
    // Add a tremolo/LFO modulation to make the pad feel alive
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.2; // very slow cycle (0.2 Hz)
    lfoGain.gain.value = 15; // modulate frequency by +/-15Hz
    
    lfo.connect(lfoGain);
    lfoGain.connect(osc2.frequency);
    lfo.start();

    osc2.connect(filter);
    osc2.start();
    osc2Ref.current = osc2;
  };

  const togglePlayback = async () => {
    try {
      if (!audioCtxRef.current) {
        initAudio();
      }

      const ctx = audioCtxRef.current;
      const gainNode = gainNodeRef.current;
      if (!ctx || !gainNode) return;

      if (ctx.state === "suspended") {
        await ctx.resume();
      }

      if (isPlaying) {
        // Fade out volume slowly to prevent pops
        gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
        setTimeout(() => {
          setIsPlaying(false);
        }, 1200);
      } else {
        // Fade in volume slowly to a safe low amplitude (5%)
        setIsPlaying(true);
        gainNode.gain.cancelScheduledValues(ctx.currentTime);
        gainNode.gain.setValueAtTime(0.0001, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 2.0);
      }
    } catch (err) {
      console.warn("Audio Context init blocked/failed: ", err);
    }
  };

  // Clean up audio nodes on unmount
  useEffect(() => {
    return () => {
      if (osc1Ref.current) osc1Ref.current.stop();
      if (osc2Ref.current) osc2Ref.current.stop();
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  return (
    <button
      onClick={togglePlayback}
      title="Toggle Cyber Synth Ambient Background Music"
      className="fixed bottom-6 left-6 z-40 p-3 bg-[#0a0a16]/80 hover:bg-[#0a0a16] border border-white/5 hover:border-[#00f0ff]/30 text-white rounded-full flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all group"
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-5.5 h-5.5 text-[#00f0ff] animate-pulse" />
          
          {/* Animated sound bars */}
          <div className="flex items-end gap-0.5 h-3.5 w-6 px-1">
            {[1.2, 0.6, 1.8, 0.9].map((dur, i) => (
              <span 
                key={i} 
                className="w-[2px] bg-[#00f0ff] rounded-t-xs"
                style={{
                  height: "100%",
                  animation: `float ${dur}s ease-in-out infinite alternate`
                }}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <VolumeX className="w-5.5 h-5.5 text-gray-500 group-hover:text-white transition-colors" />
          <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest group-hover:text-gray-300 transition-colors pr-1 hidden md:block">
            SOUND OFF
          </span>
        </>
      )}
    </button>
  );
}
