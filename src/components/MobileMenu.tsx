"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { NavLink } from "@/data/navigation";

export default function MobileMenu({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="lg:hidden">
      {/* Bouton burger */}
      <button
        type="button"
        aria-expanded={open}
        aria-controls="menu-mobile"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        onClick={() => setOpen(!open)}
        className="grid h-10 w-10 place-items-center rounded-full border border-trait bg-fond-doux text-encre transition-colors hover:border-indigo hover:text-indigo"
      >
        {open ? (
          <X size={20} aria-hidden="true" />
        ) : (
          <Menu size={20} aria-hidden="true" />
        )}
      </button>

      {/* Menu déroulant animé */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute left-0 right-0 top-full overflow-hidden border-b border-trait bg-fond shadow-2xl shadow-black/40"
          >
            <div className="mx-auto max-w-6xl px-4 py-6 sm:px-5">
              <ul className="flex flex-col gap-1">
                {links.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.25 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-5 py-3.5 font-sous text-base font-medium text-encre-douce transition-colors hover:bg-fond-doux hover:text-indigo"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* Statut dispo mobile */}
              <div className="mt-6 flex items-center gap-2 border-t border-trait pt-4">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-dispo opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-dispo" />
                </span>
                <span className="font-mono text-xs font-medium text-encre-douce">
                  Disponible pour missions
                </span>
              </div>

              {/* CTA CV mobile */}
              <a
                href="/cv-clever.pdf"
                download
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-trait px-6 py-3 font-sous text-sm font-medium text-encre-douce transition-all hover:border-indigo hover:text-indigo"
              >
                <Download size={16} aria-hidden="true" />
                Télécharger mon CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}