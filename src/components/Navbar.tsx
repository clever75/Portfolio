"use client";

import Link from "next/link";
import { Download } from "lucide-react";
import { motion } from "framer-motion";
import { navLinks } from "@/data/navigation";
import MobileMenu from "@/components/MobileMenu";
import LomeClock from "@/components/LomeClock";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-trait/60 bg-fond/80 backdrop-blur-md"
    >
      <nav
        aria-label="Navigation principale"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6"
      >
        {/* ====== LOGO + NOM ====== */}
        <Link href="/" className="group flex items-center gap-3 text-encre">
          <span
            aria-hidden="true"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-indigo font-titre text-lg font-black text-fond transition-transform duration-300 group-hover:scale-110"
          >
            C
          </span>
          <span className="font-sous text-[15px] font-semibold tracking-tight">
            ASSAN Ablavi Clever
          </span>
        </Link>

        {/* ====== LIENS DESKTOP ====== */}
        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href} className="relative">
              <Link
                href={link.href}
                className="relative font-sous text-sm font-medium text-encre-douce transition-colors hover:text-encre"
              >
                {link.label}
                <motion.span
                  className="absolute -bottom-1 left-0 h-px w-full origin-left bg-indigo"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* ====== ACTIONS ====== */}
        <div className="flex items-center gap-4">
          {/* Horloge Lomé + Statut Disponible — desktop */}
          <div className="hidden items-center gap-3 lg:flex">
            <LomeClock />
            <span className="h-4 w-px bg-trait" aria-hidden="true" />
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-dispo opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-dispo" />
              </span>
              <span className="font-mono text-xs font-medium text-encre-douce">
                Disponible
              </span>
            </div>
          </div>

          {/* Séparateur vertical */}
          <span
            className="hidden h-4 w-px bg-trait lg:block"
            aria-hidden="true"
          />

          {/* CTA CV — icône + texte discret */}
          <a
            href="/cv-clever.pdf"
            download
            className="hidden items-center gap-2 rounded-full border border-trait px-4 py-2 font-sous text-xs font-medium text-encre-douce transition-all duration-300 hover:border-indigo hover:text-indigo lg:inline-flex"
          >
            <Download size={14} aria-hidden="true" />
            CV
          </a>

          {/* Menu mobile */}
          <MobileMenu links={navLinks} />
        </div>
      </nav>
    </motion.header>
  );
}