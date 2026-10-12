"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  MapPin,
  Briefcase,
  Languages,
  CalendarCheck,
  Target,
} from "lucide-react";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";

const infosAbout = [
  {
    icon: GraduationCap,
    label: "Formation",
    valeur: "BTS Développement d'Applications",
    detail: "Institut Polytechnique DEFITECH",
  },
  {
    icon: MapPin,
    label: "Lieu",
    valeur: "Lomé, Togo",
    detail: null,
  },
  {
    icon: Briefcase,
    label: "Recherche",
    valeur: "Stage • Freelance • Projet ponctuel",
    detail: null,
  },
  {
    icon: Languages,
    label: "Langues",
    valeur: "Français (courant) • Anglais (scolaire)",
    detail: null,
  },
  {
    icon: CalendarCheck,
    label: "Disponibilité",
    valeur: "Immédiate",
    detail: null,
  },
];

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

export default function About() {
  return (
    <Section id="apropos">
      <SectionTitle
        number="01"
        label="À propos"
        title="Apprendre en construisant"
      />

      {/* === PHRASE SIGNATURE === */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-12 max-w-3xl font-titre text-3xl font-bold leading-tight text-encre sm:text-4xl lg:text-5xl"
      >
        Comprendre à fond,{" "}
        <span className="text-indigo">construire juste.</span>
      </motion.p>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
        {/* === TEXTE NARRATIF === */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="space-y-5 text-base leading-relaxed text-encre-douce sm:text-lg lg:col-span-3"
        >
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
        </motion.div>

        {/* === TABLEAU INFOS === */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="lg:col-span-2"
        >
          <div className="overflow-hidden rounded-2xl border border-trait bg-fond-doux">
            {infosAbout.map((info, index) => {
              const Icon = info.icon;
              const isLast = index === infosAbout.length - 1;

              return (
                <motion.div
                  key={info.label}
                  variants={item}
                  className={`flex flex-col gap-2 px-5 py-5 ${
                    !isLast ? "border-b border-trait" : ""
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon size={14} className="text-indigo" aria-hidden="true" />
                    <span className="font-mono text-[11px] font-medium uppercase tracking-widest text-encre-douce">
                      {info.label}
                    </span>
                  </div>
                  <p className="font-sous text-sm font-medium text-encre">
                    {info.valeur}
                  </p>
                  {info.detail && (
                    <p className="text-xs text-encre-douce">{info.detail}</p>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* === ENCART "CE QUE JE CHERCHE" === */}
          <motion.div
            variants={item}
            className="mt-4 flex items-start gap-3 rounded-2xl border border-indigo/30 bg-indigo/5 px-5 py-5"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-indigo/20 text-indigo">
              <Target size={18} aria-hidden="true" />
            </span>
            <div>
              <p className="font-mono text-[11px] font-medium uppercase tracking-widest text-indigo/80">
                Ce que je cherche
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-encre">
                Un stage ou des missions freelance où je peux apprendre
                en construisant — et livrer du code qui sert vraiment.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}