"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin, Briefcase } from "lucide-react";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import FadeIn from "@/components/ui/FadeIn";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";

const ficheProfil = {
  formation: {
    icon: GraduationCap,
    label: "Formation",
    titre: "BTS Développement d'Applications",
    detail: "Institut Polytechnique DEFITECH",
  },
  lieu: {
    icon: MapPin,
    label: "Lieu",
    titre: "Lomé, Togo",
    detail: null,
  },
  recherche: {
    icon: Briefcase,
    label: "Recherche",
    titre: "Stage • Freelance • Projet ponctuel",
    detail: null,
  },
};

export default function About() {
  return (
    <Section id="apropos">
      {/* Titre de section */}
      <SectionTitle
        number="01"
        label="À propos"
        title="Apprendre en construisant"
      />

      {/* Texte principal — fade-up au scroll */}
      <FadeIn>
        <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-encre-douce">
          <p>
            Il y a un truc que j&apos;ai compris en codant : les meilleures
            solutions, ce ne sont pas les plus impressionnantes. Ce sont celles
            qui marchent, qu&apos;on comprend, et qu&apos;on peut faire évoluer.
          </p>
          <p>
            Ce que je livre, je peux l&apos;expliquer. Pas en survol — ligne par
            ligne, choix par choix. Parce qu&apos;un jour, quelqu&apos;un devra
            reprendre ce code. Peut-être moi.
          </p>
          <p>
            Alors je prends le temps. Je pose des questions. Je teste. Et quand
            ça ne tient pas, je recommence.
          </p>
          <p className="font-medium text-encre">
            C&apos;est comme ça que je travaille.
          </p>
        </div>
      </FadeIn>

      {/* Fiche profil — disposition 2 colonnes + 1 large */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        {/* FORMATION — colonne large (2/3) */}
        <motion.div
          variants={staggerItem}
          className="rounded-2xl border border-trait bg-fond-doux p-6 transition-colors duration-300 hover:border-indigo/40 sm:col-span-2"
        >
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-indigo/15 text-indigo">
              <GraduationCap size={18} aria-hidden="true" />
            </span>
            <span className="font-mono text-xs font-medium uppercase tracking-widest text-encre-douce">
              Formation
            </span>
          </div>
          <p className="mt-4 font-sous text-lg font-semibold text-encre">
            BTS Développement d&apos;Applications
          </p>
          <p className="mt-1 text-sm text-encre-douce">
            Institut Polytechnique DEFITECH
          </p>
        </motion.div>

        {/* LIEU — colonne fine (1/3) */}
        <motion.div
          variants={staggerItem}
          className="rounded-2xl border border-trait bg-fond-doux p-6 transition-colors duration-300 hover:border-indigo/40"
        >
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-indigo/15 text-indigo">
              <MapPin size={18} aria-hidden="true" />
            </span>
            <span className="font-mono text-xs font-medium uppercase tracking-widest text-encre-douce">
              Lieu
            </span>
          </div>
          <p className="mt-4 font-sous text-lg font-semibold text-encre">
            Lomé, Togo
          </p>
        </motion.div>

        {/* RECHERCHE — pleine largeur */}
        <motion.div
          variants={staggerItem}
          className="rounded-2xl border border-trait bg-fond-doux p-6 transition-colors duration-300 hover:border-indigo/40 sm:col-span-3"
        >
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-indigo/15 text-indigo">
              <Briefcase size={18} aria-hidden="true" />
            </span>
            <span className="font-mono text-xs font-medium uppercase tracking-widest text-encre-douce">
              Recherche
            </span>
          </div>
          <p className="mt-4 font-sous text-lg font-semibold text-encre">
            Stage • Freelance • Projet ponctuel
          </p>
        </motion.div>
      </motion.div>
    </Section>
  );
}