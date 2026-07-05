"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MouseFollower() {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const ringSpringConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const dotSpringConfig = { damping: 40, stiffness: 400 };

  const cursorRingX = useSpring(cursorX, ringSpringConfig);
  const cursorRingY = useSpring(cursorY, ringSpringConfig);

  const cursorDotX = useSpring(cursorX, dotSpringConfig);
  const cursorDotY = useSpring(cursorY, dotSpringConfig);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      setVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        !!target.closest("a, button, input, textarea, .clickable");

      setHovered(isClickable);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.style.cursor = "auto";
    };
  }, [cursorX, cursorY]);

  if (!visible) return null;

  return (
    <>
      <motion.div
        style={{
          x: cursorRingX,
          y: cursorRingY,
        }}
        className="fixed top-0 left-0 z-50 flex h-8 w-8 items-center justify-center rounded-full border pointer-events-none mix-blend-screen"
        animate={{
          scale: hovered ? 1.5 : 1,
          borderColor: hovered ? "#00ffcc" : "#00f0ff",
          backgroundColor: hovered
            ? "rgba(0, 255, 204, 0.05)"
            : "rgba(0, 240, 255, 0)",
          boxShadow: hovered
            ? "0 0 15px rgba(0, 255, 204, 0.6)"
            : "0 0 8px rgba(0, 240, 255, 0.3)",
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.2 }}
      />

      <motion.div
        style={{
          x: cursorDotX,
          y: cursorDotY,
        }}
        className="fixed top-0 left-0 z-50 h-2 w-2 rounded-full pointer-events-none mix-blend-screen bg-[#bd00ff]"
        animate={{
          scale: hovered ? 0.5 : 1,
          backgroundColor: hovered ? "#00ffcc" : "#bd00ff",
          boxShadow: hovered
            ? "0 0 10px rgba(0, 255, 204, 0.8)"
            : "0 0 5px rgba(189, 0, 255, 0.6)",
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
      />
    </>
  );
}