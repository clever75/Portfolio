"use client";

import Link from "next/link";
import Image from "next/image";
import { Caveat } from "next/font/google";
import { ArrowDown, ArrowRight, Code, Heart, Leaf, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { contact, contactLinks } from "@/data/contact";
import {
  GithubIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "@/components/BrandIcons";
import DecorFeuille from "@/components/DecorFeuille";

const manuscrit = Caveat({ subsets: ["latin"], weight: "600" });

const reseaux = [
  { label: "GitHub", href: contactLinks.github, Icon: GithubIcon, externe: true },
  { label: "LinkedIn", href: contactLinks.linkedin, Icon: LinkedinIcon, externe: true },
  { label: "WhatsApp", href: contactLinks.whatsapp, Icon: WhatsappIcon, externe: true },
  { label: "E-mail", href: contactLinks.email, Icon: Mail, externe: false },
];

const formeBlob = { clipPath: "url(#blob-photo)" };

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

export default function Hero() {
  return (
    <div className="relative overflow-hidden">
      {/* ---------- Décorations d'arrière-plan ---------- */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full bg-indigo/10 blur-3xl sm:h-96 sm:w-96"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-indigo/5 blur-3xl"
      />
      <DecorFeuille className="pointer-events-none absolute -left-6 top-28 hidden h-44 w-24 -rotate-12 text-indigo opacity-20 lg:block" />
      <DecorFeuille className="pointer-events-none absolute -right-4 top-1/2 hidden h-56 w-28 rotate-12 text-indigo opacity-20 lg:block" />

      <section className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 pb-12 pt-16 lg:grid-cols-2 lg:pb-20 lg:pt-24">
        {/* ---------- Colonne texte ---------- */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="relative z-10"
        >
          {/* Badge — simplifié */}
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-indigo/30 bg-fond-doux px-4 py-1.5 font-mono text-xs font-medium text-indigo"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-indigo" aria-hidden="true" />
            Développeuse d&apos;applications junior
          </motion.span>

          {/* H1 */}
          <motion.h1 variants={fadeUp} className="mt-6 font-titre text-encre">
            <span className="block text-xl font-light italic text-encre-douce sm:text-2xl">
              Je m&apos;appelle
            </span>
            <span className="mt-3 block text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              ASSAN Ablavi
            </span>
            <span className="block text-6xl font-black leading-[1.05] tracking-tight text-indigo sm:text-7xl lg:text-8xl">
              Clever.
            </span>
          </motion.h1>

          {/* Sous-titre — promesse */}
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-lg text-base leading-relaxed text-encre-douce sm:text-lg"
          >
            Je ne peux pas vous promettre un code parfait — je débute.
            Je peux vous promettre du code qui fonctionne, qui se lit,
            et qui se maintient.
          </motion.p>

          {/* Boutons */}
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/#projets"
              className="group inline-flex items-center gap-2 rounded-full bg-indigo px-6 py-3 font-sous font-medium text-fond transition duration-300 hover:-translate-y-0.5 hover:bg-indigo-fonce hover:shadow-lg hover:shadow-indigo/40"
            >
              <ArrowRight
                size={18}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
              Voir mes projets
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full border border-trait px-6 py-3 font-sous font-medium text-encre transition duration-300 hover:border-indigo hover:text-indigo"
            >
              <Mail size={18} aria-hidden="true" />
              Me contacter
            </Link>
          </motion.div>

          {/* Réseaux sociaux */}
          <motion.ul variants={fadeUp} className="mt-8 flex gap-3">
            {reseaux.map(({ label, href, Icon, externe }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  {...(externe
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="grid h-11 w-11 place-items-center rounded-full border border-trait bg-fond-doux text-encre-douce transition duration-300 hover:-translate-y-0.5 hover:border-indigo hover:text-indigo"
                >
                  <Icon size={18} />
                </a>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* ---------- Colonne photo ---------- */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="relative mx-auto w-full max-w-md justify-self-center lg:justify-self-end lg:pr-8"
        >
          {/* Forme blob (SVG invisible) */}
          <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
            <defs>
              <clipPath id="blob-photo" clipPathUnits="objectBoundingBox">
                <path d="M0.5,0.02 C0.72,0 0.93,0.1 0.97,0.3 C1,0.48 0.92,0.58 0.9,0.72 C0.88,0.88 0.75,1 0.55,0.99 C0.35,0.98 0.2,0.95 0.1,0.82 C0,0.68 0.04,0.5 0.07,0.36 C0.1,0.16 0.28,0.04 0.5,0.02 Z" />
              </clipPath>
            </defs>
          </svg>

          {/* Halo violet flou derrière la photo */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 scale-110 rounded-full bg-indigo/25 blur-3xl"
          />

          {/* Blob sombre décalé, derrière la photo */}
          <div
            aria-hidden="true"
            style={formeBlob}
            className="absolute inset-0 translate-x-2 translate-y-3 rotate-6 scale-105 bg-gradient-to-br from-indigo/40 to-indigo/10 sm:translate-x-5 sm:translate-y-4"
          />

          {/* Photo */}
          <div className="relative aspect-[4/5] drop-shadow-2xl">
            <div className="relative h-full w-full" style={formeBlob}>
              <Image
                src="/photo-clever.jpg"
                alt="Portrait de ASSAN Ablavi Clever"
                fill
                priority
                sizes="(min-width: 1024px) 448px, 90vw"
                className="object-cover object-[50%_5%]"
              />
            </div>
          </div>

          {/* Texte manuscrit — décalé */}
          <p
            className={`${manuscrit.className} absolute right-4 top-0 -rotate-12 text-xl leading-tight text-indigo sm:right-8 sm:text-2xl`}
          >
            Coder
            <br />
            Créer
            <br />
            Imaginer <Heart size={16} className="inline" aria-hidden="true" />
          </p>

          {/* Bloc code — descendu + décalé */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute -left-6 bottom-4 z-10 hidden rounded-xl border border-indigo/30 bg-fond-doux/95 p-5 shadow-2xl shadow-indigo/20 backdrop-blur-sm sm:-left-20 sm:block lg:-left-24"
          >
            <pre className="font-mono text-xs leading-relaxed text-encre-douce sm:text-sm">
              <span className="text-indigo">const</span> dreams = {"{"}
              {"\n"}  code: <span className="text-dispo">true</span>,
              {"\n"}  projects: <span className="text-dispo">true</span>,
              {"\n"}  impact: <span className="text-dispo">true</span>
              {"\n"}
              {"};"}
              <span className="ml-1 inline-block h-3 w-1.5 translate-y-0.5 animate-pulse bg-indigo" />
            </pre>
            <span className="absolute -bottom-3 -right-3 grid h-9 w-9 place-items-center rounded-lg bg-indigo text-fond">
              <Code size={18} />
            </span>
          </motion.div>

          {/* Badge Lomé — version sombre */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="absolute -right-2 bottom-8 z-10 flex items-center gap-3 rounded-xl border border-trait bg-fond-doux/95 px-4 py-3 shadow-2xl shadow-black/40 backdrop-blur-sm sm:-right-6"
          >
            <span
              aria-hidden="true"
              className="grid h-9 w-9 place-items-center rounded-full bg-indigo/15 text-dispo"
            >
              <Leaf size={18} />
            </span>
            <p className="font-sous text-xs leading-tight text-encre-douce">
              De Lomé, Togo
              <span className="mt-1 flex items-center gap-1.5 font-medium text-encre">
                {contact.disponibilite}
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-dispo opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-dispo" />
                </span>
              </span>
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ---------- Flèche de défilement ---------- */}
      <a
        href="/#apropos"
        aria-label="Aller à la section À propos"
        className="absolute bottom-4 left-1/2 -ml-6 hidden h-12 w-12 place-items-center rounded-full border border-trait bg-fond-doux text-encre-douce shadow-lg transition hover:border-indigo hover:text-indigo motion-safe:animate-bounce lg:grid"
      >
        <ArrowDown size={20} aria-hidden="true" />
      </a>
    </div>
  );
}