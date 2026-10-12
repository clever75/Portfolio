"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import ProjetCard from "@/components/ui/ProjetCard";
import ProjetModal from "@/components/ui/ProjetModal";
import { projets, type Projet } from "@/data/projets";

type Filtre = "Tous" | "Web" | "Desktop";

const FILTRES: Filtre[] = ["Tous", "Web", "Desktop"];

export default function Projets() {
  const [filtre, setFiltre] = useState<Filtre>("Tous");
  const [projetActif, setProjetActif] = useState<Projet | null>(null);

  const projetsFiltres =
    filtre === "Tous" ? projets : projets.filter((p) => p.type === filtre);

  const [vedette, ...autres] = projetsFiltres;

  return (
    <Section id="projets">
      <SectionTitle
        number="02"
        label="Projets"
        title="Cinq projets, cinq apprentissages"
        subtitle="Des applications web et desktop conçues pendant mon BTS — chacune avec un vrai besoin derrière."
      />

      {/* Filtres */}
      <div className="mb-10 flex flex-wrap gap-2">
        {FILTRES.map((f) => {
          const actif = filtre === f;
          const count =
            f === "Tous"
              ? projets.length
              : projets.filter((p) => p.type === f).length;

          return (
            <button
              key={f}
              onClick={() => setFiltre(f)}
              className={`relative rounded-full border px-4 py-2 font-sous text-sm font-medium transition-colors duration-300 ${
                actif
                  ? "border-indigo bg-indigo text-fond"
                  : "border-trait bg-fond-doux text-encre-douce hover:border-indigo/40 hover:text-encre"
              }`}
            >
              {f}
              <span
                className={`ml-2 font-mono text-xs ${
                  actif ? "text-fond/70" : "text-encre-douce/60"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grille */}
      <motion.div
        layout
        className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {vedette && (
            <motion.div
              key={vedette.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="sm:col-span-2"
            >
              <ProjetCard
                projet={vedette}
                featured
                onClick={() => setProjetActif(vedette)}
              />
            </motion.div>
          )}

          {autres.map((projet) => (
            <motion.div
              key={projet.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <ProjetCard
                projet={projet}
                onClick={() => setProjetActif(projet)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Modale */}
      <ProjetModal
        projet={projetActif}
        onClose={() => setProjetActif(null)}
      />
    </Section>
  );
}