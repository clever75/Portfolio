"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import { parcours } from "@/data/parcours";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function Parcours() {
  return (
    <Section id="parcours">
      <SectionTitle
        number="04"
        label="Parcours"
        title="Les étapes qui m'ont menée ici"
        subtitle="Ma formation, mes projets, et où j'en suis aujourd'hui."
      />

      {/* === TIMELINE === */}
      <div className="relative">
        {/* Ligne verticale */}
        <motion.div
          aria-hidden="true"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute left-4 top-2 bottom-2 w-px origin-top bg-gradient-to-b from-indigo via-indigo/40 to-transparent sm:left-6"
        />

        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-6"
        >
          {parcours.map((etape) => (
            <motion.li
              key={etape.numero}
              variants={item}
              className="relative pl-12 sm:pl-20"
            >
              {/* Point sur la ligne */}
              <span
                aria-hidden="true"
                className="absolute left-2.5 top-6 grid h-3 w-3 place-items-center rounded-full border-2 border-indigo bg-fond sm:left-4.5"
              />

              {/* Carte */}
              <div className="group rounded-2xl border border-trait bg-fond-doux p-6 transition-all duration-500 hover:-translate-y-1 hover:border-indigo/40 hover:shadow-2xl hover:shadow-indigo/10">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs font-medium text-indigo">
                      {etape.numero}
                    </span>
                    <span
                      aria-hidden="true"
                      className="h-px w-6 bg-indigo/40"
                    />
                    <h3 className="font-sous text-lg font-semibold text-encre">
                      {etape.titre}
                    </h3>
                  </div>
                  <span className="font-mono text-[11px] font-medium uppercase tracking-widest text-encre-douce">
                    {etape.annee}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-encre-douce">
                  {etape.description}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </Section>
  );
}