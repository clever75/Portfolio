"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Éléments qui déclenchent l'agrandissement du curseur.
const SELECTEUR_INTERACTIF =
  "a, button, [role='button'], input, textarea, select, [data-cursor-hover]";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [survol, setSurvol] = useState(false);

  // Position brute : suit la souris instantanément (le point)
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Position lissée : suit avec un léger retard (le halo)
  const ressort = { damping: 25, stiffness: 400, mass: 0.4 };
  const haloX = useSpring(x, ressort);
  const haloY = useSpring(y, ressort);

  useEffect(() => {
    // Le curseur personnalisé n'a de sens qu'avec une vraie souris
    // (pas sur écran tactile) et si l'utilisateur n'a pas demandé moins d'animations.
    const sourisPrecise = window.matchMedia("(hover: hover) and (pointer: fine)");
    const moinsAnimations = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!sourisPrecise.matches || moinsAnimations.matches) return;

    const racine = document.documentElement;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      // On ne cache le curseur natif qu'au premier mouvement : avant ça,
      // le nôtre n'est pas encore affiché et l'utilisateur n'aurait aucun curseur.
      racine.classList.add("curseur-personnalise");
      setVisible(true);
    };

    // Délégation d'événements : UN seul écouteur sur le document.
    // `mouseover` remonte (bubbles), donc il couvre aussi les éléments
    // créés après le chargement (cartes filtrées, modale...).
    const onOver = (e: MouseEvent) => {
      const cible = e.target;
      setSurvol(cible instanceof Element && cible.closest(SELECTEUR_INTERACTIF) !== null);
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    racine.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      racine.removeEventListener("mouseleave", onLeave);
      racine.classList.remove("curseur-personnalise");
    };
  }, [x, y]);

  return (
    <>
      {/* Halo (suit avec retard) */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{ x: haloX, y: haloY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          animate={{
            width: survol ? 56 : 36,
            height: survol ? 56 : 36,
            opacity: visible ? (survol ? 0.35 : 0.2) : 0,
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="rounded-full bg-indigo blur-md"
        />
      </motion.div>

      {/* Point (suit instantanément) */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[10000]"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          animate={{
            width: survol ? 10 : 8,
            height: survol ? 10 : 8,
            opacity: visible ? 1 : 0,
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="rounded-full bg-indigo"
        />
      </motion.div>
    </>
  );
}