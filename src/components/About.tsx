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
        title="Quelques mots sur moi"
      />

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-5">
        {/* === TEXTE NARRATIF === */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="space-y-5 text-base leading-relaxed text-encre-douce sm:text-lg lg:col-span-3"
        >
          <p>
            Je m&apos;appelle Clever. Je vis à Lomé, au Togo, et c&apos;est là
            que j&apos;ai découvert le code — pendant mon BTS en Développement
            d&apos;Applications. Ce qui m&apos;a accrochée tout de suite ? Pas
            les lignes de code en elles-mêmes, mais l&apos;idée de pouvoir
            résoudre un problème concret avec.
          </p>
          <p>
            Depuis, je construis. J&apos;apprends en faisant, en me trompant,
            en recommençant. Ma méthode tient en une phrase : comprendre à fond
            avant de construire. Alors je pose des questions, même celles qui
            paraissent bêtes. Je teste. Je prends le temps de bien faire —
            parce qu&apos;un code qu&apos;on ne comprend pas ne sert à personne.
          </p>
          <p>
            Aujourd&apos;hui, je cherche un stage ou des missions pour
            continuer à apprendre. En construisant des choses qui servent
            vraiment.
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