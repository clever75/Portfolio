"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/BrandIcons";
import { navLinks } from "@/data/navigation";
import { contact, contactLinks } from "@/data/contact";

const reseaux = [
  { label: "GitHub", href: contactLinks.github, Icon: GithubIcon, externe: true },
  { label: "LinkedIn", href: contactLinks.linkedin, Icon: LinkedinIcon, externe: true },
  { label: "WhatsApp", href: contactLinks.whatsapp, Icon: WhatsappIcon, externe: true },
  { label: "E-mail", href: contactLinks.email, Icon: Mail, externe: false },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative mt-20 border-t border-trait bg-fond-doux/50">
      {/* Halo décoratif */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-indigo/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-6 py-16">
        {/* === HAUT : Logo + Navigation + Contact === */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {/* Colonne 1 : Logo + tagline */}
          <div>
            <Link
              href="/"
              className="group inline-flex items-center gap-3 text-encre"
            >
              <span
                aria-hidden="true"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-indigo font-titre text-lg font-black text-fond transition-transform duration-300 group-hover:scale-110"
              >
                C
              </span>
              <span className="font-sous text-base font-semibold tracking-tight">
                Clever
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-encre-douce">
              Développeuse d&apos;applications basée à Lomé, Togo. Je conçois du
              code qui fonctionne, qui se lit, et qui se maintient.
            </p>
          </div>

          {/* Colonne 2 : Navigation */}
          <div>
            <p className="font-mono text-[11px] font-medium uppercase tracking-widest text-indigo">
              Navigation
            </p>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-encre-douce transition-colors hover:text-encre"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 : Contact */}
          <div>
            <p className="font-mono text-[11px] font-medium uppercase tracking-widest text-indigo">
              Contact
            </p>
            <ul className="mt-5 space-y-3">
              {reseaux.map(({ label, href, Icon, externe }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(externe
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group inline-flex items-center gap-2.5 text-sm text-encre-douce transition-colors hover:text-encre"
                  >
                    <Icon
                      size={16}
                      className="text-encre-douce/60 transition-colors group-hover:text-indigo"
                    />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* === BAS : Copyright + Technos === */}
        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-trait pt-8 sm:flex-row sm:items-center">
          <div className="space-y-1">
            <p className="text-sm text-encre-douce">
              © {new Date().getFullYear()}{" "}
              <span className="font-medium text-encre">ASSAN Ablavi Clever</span>
            </p>
            <p className="font-mono text-[11px] text-encre-douce/60">
              Fait avec Next.js • TypeScript • Tailwind • Framer Motion
            </p>
          </div>

          {/* Bouton remonter */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Remonter en haut de la page"
            className="group grid h-11 w-11 place-items-center rounded-full border border-trait bg-fond text-encre-douce transition-colors hover:border-indigo hover:text-indigo"
          >
            <ArrowUp
              size={18}
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}