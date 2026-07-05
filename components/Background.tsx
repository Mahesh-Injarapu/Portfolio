"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
}

interface Star {
  x: number;
  y: number;
  size: number;
  twinkleSpeed: number;
  alpha: number;
  growing: boolean;
}

interface Blob {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, tx: -1000, ty: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let stars: Star[] = [];
    let blobs: Blob[] = [];

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initElements();
    };

    const initElements = () => {
      particles = [];
      stars = [];
      blobs = [];

      const width = canvas.width;
      const height = canvas.height;

      // 1. Initialize Particles (ambient floating items)
      const particleCount = Math.min(Math.floor((width * height) / 15000), 60);
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          size: Math.random() * 2 + 1,
          color: Math.random() > 0.5 ? "#00f0ff" : "#bd00ff",
          alpha: Math.random() * 0.5 + 0.1,
        });
      }

      // 2. Initialize Twinkling Stars
      const starCount = Math.min(Math.floor((width * height) / 8000), 120);
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.5 + 0.5,
          twinkleSpeed: 0.005 + Math.random() * 0.015,
          alpha: Math.random(),
          growing: Math.random() > 0.5,
        });
      }

      // 3. Initialize Glowing Mesh Blobs (slow moving, large gradients)
      const colors = [
        "rgba(0, 240, 255, 0.08)",   // Neon Blue
        "rgba(189, 0, 255, 0.06)",   // Neon Purple
        "rgba(0, 255, 204, 0.06)",   // Neon Cyan
      ];
      for (let i = 0; i < 3; i++) {
        blobs.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.min(width, height) * 0.35 + Math.random() * 100,
          color: colors[i],
        });
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Mouse move tracker
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.tx = e.clientX;
      mouseRef.current.ty = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Render loop
    const render = () => {
      const w = canvas.width;
      const h = canvas.height;

      // Smooth mouse follow
      const m = mouseRef.current;
      m.x += (m.tx - m.x) * 0.1;
      m.y += (m.ty - m.y) * 0.1;

      // Dark background fill
      ctx.fillStyle = "#020205";
      ctx.fillRect(0, 0, w, h);

      // 1. Draw Mesh Blobs
      blobs.forEach((b) => {
        // Move blob
        b.x += b.vx;
        b.y += b.vy;

        // Bounce blobs off edges
        if (b.x - b.radius < 0 || b.x + b.radius > w) b.vx *= -1;
        if (b.y - b.radius < 0 || b.y + b.radius > h) b.vy *= -1;

        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius);
        grad.addColorStop(0, b.color);
        grad.addColorStop(1, "rgba(2, 2, 5, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Draw Twinkling Stars
      stars.forEach((s) => {
        // Twinkle update
        if (s.growing) {
          s.alpha += s.twinkleSpeed;
          if (s.alpha >= 0.8) s.growing = false;
        } else {
          s.alpha -= s.twinkleSpeed;
          if (s.alpha <= 0.1) s.growing = true;
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Draw Interactive Mouse Glow
      if (m.x > -500) {
        const glowRad = Math.min(w, h) * 0.2;
        const mouseGlow = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, glowRad);
        mouseGlow.addColorStop(0, "rgba(0, 240, 255, 0.07)");
        mouseGlow.addColorStop(0.5, "rgba(189, 0, 255, 0.03)");
        mouseGlow.addColorStop(1, "rgba(2, 2, 5, 0)");

        ctx.fillStyle = mouseGlow;
        ctx.beginPath();
        ctx.arc(m.x, m.y, glowRad, 0, Math.PI * 2);
        ctx.fill();
      }

      // 4. Draw Floating Particles & Lines
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around screen boundaries
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0; // Reset

        // Connect nearby particles
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.15;
            ctx.strokeStyle = p.color === "#00f0ff" ? `rgba(0, 240, 255, ${alpha})` : `rgba(189, 0, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10 block pointer-events-none" />;
}
