"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  // Position brute (suit la souris instantanément pour le point)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Position lissée (suit la souris avec un léger retard pour le halo)
  const springConfig = { damping: 25, stiffness: 400, mass: 0.4 };
  const haloX = useSpring(cursorX, springConfig);
  const haloY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Détecte les appareils tactiles → désactive le curseur
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;
    setIsTouch(isTouchDevice);
    if (isTouchDevice) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Détecte le survol des éléments interactifs
    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Attache les events hover à tous les liens/boutons
    const interactiveElements = document.querySelectorAll(
      "a, button, [role='button'], input, textarea, [data-cursor-hover]"
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverStart);
      el.addEventListener("mouseleave", handleHoverEnd);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart);
        el.removeEventListener("mouseleave", handleHoverEnd);
      });
    };
  }, [cursorX, cursorY, isVisible]);

  // Ne rien rendre sur mobile
  if (isTouch) return null;

  return (
    <>
      {/* Cache le curseur natif partout sauf pour les inputs */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        input, textarea, select {
          cursor: text !important;
        }
        @media (prefers-reduced-motion: reduce) {
          * { cursor: auto !important; }
        }
      `}</style>

      {/* Halo (suit avec retard) */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden lg:block"
        style={{
          x: haloX,
          y: haloY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 56 : 36,
            height: isHovering ? 56 : 36,
            opacity: isVisible ? (isHovering ? 0.35 : 0.2) : 0,
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="rounded-full bg-indigo blur-md"
        />
      </motion.div>

      {/* Point (suit instantanément) */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[10000] hidden lg:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 10 : 8,
            height: isHovering ? 10 : 8,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="rounded-full bg-indigo"
        />
      </motion.div>
    </>
  );
}