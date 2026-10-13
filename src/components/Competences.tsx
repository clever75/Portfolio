"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import { competences, phraseFin } from "@/data/competences";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

// Cascade pour les tags à l'intérieur d'une catégorie
const tagContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.2 },
  },
};

const tagItem = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

export default function Competences() {
  return (
    <Section id="competences">
      <SectionTitle
        number="03"
        label="Compétences"
        title="Ce que je sais faire"
        subtitle="Les technologies et les outils que j'utilise pour concevoir, construire et maintenir des applications."
      />

      {/* Grille des catégories */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2"
      >
        {competences.map((cat) => {
          const Icon = cat.icon;
          return (
            <motion.article
              key={cat.id}
              variants={item}
              className="
                group relative overflow-hidden rounded-2xl border border-trait
                bg-gradient-to-br from-fond-doux to-fond p-6 sm:p-7
                transition-all duration-500
                hover:-translate-y-1 hover:border-indigo/50
                hover:shadow-2xl hover:shadow-indigo/15
              "
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-indigo/0 blur-3xl transition-all duration-700 group-hover:bg-indigo/15"
              />

              {/* En-tête */}
              <div className="relative flex items-center gap-4">
                <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-indigo/15 text-indigo transition-all duration-500 group-hover:bg-indigo group-hover:text-fond group-hover:rotate-[360deg]">
                  <Icon size={22} className="relative z-10" aria-hidden="true" />
                </span>
                <h3 className="font-sous text-base font-semibold uppercase tracking-widest text-encre">
                  {cat.titre}
                </h3>
              </div>

              {/* Sous-catégories */}
              <div className="relative mt-7 space-y-6">
                {cat.sousCategories.map((sc) => (
                  <div
                    key={sc.label}
                    className="border-l-2 border-indigo/30 pl-4"
                  >
                    <p className="font-mono text-[11px] font-medium uppercase tracking-widest text-encre-douce/70">
                      {sc.label}
                    </p>
                    <motion.ul
                      variants={tagContainer}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-40px" }}
                      className="mt-2.5 flex flex-wrap gap-1.5"
                    >
                    {sc.items.map((tech) => (
  <motion.li
    key={tech.nom}
    variants={tagItem}
    className="inline-flex items-center gap-1.5 rounded-md border border-indigo/20 bg-fond px-2.5 py-1 font-mono text-xs text-encre-douce transition-all duration-200 hover:scale-105 hover:border-indigo/60 hover:text-encre"
  >
    {tech.logo ? (
      <img
        src={tech.logo}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className={`h-3.5 w-3.5 shrink-0 object-contain ${tech.invert ? "invert" : ""}`}
      />
    ) : (
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 shrink-0 rounded-full"
        style={{ backgroundColor: tech.couleur ?? "#6366f1" }}
      />
    )}
    {tech.nom}
  </motion.li>
))}
                    </motion.ul>
                  </div>
                ))}
              </div>
            </motion.article>
          );
        })}
      </motion.div>

      {/* Phrase de fin */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-12 max-w-2xl border-l-2 border-indigo/40 pl-4 text-sm italic text-encre-douce sm:text-base"
      >
        {phraseFin}
      </motion.p>
    </Section>
  );
}