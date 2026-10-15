"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, X, ExternalLink, Code2, Download } from "lucide-react";
import type { Projet } from "@/data/projets";

type ProjetModalProps = {
  projet: Projet | null;
  onClose: () => void;
};

const FOCALISABLES =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function ProjetModal({ projet, onClose }: ProjetModalProps) {
  return (
    <AnimatePresence>
      {projet && (
        <ModalContenu key={projet.id} projet={projet} onClose={onClose} />
      )}
    </AnimatePresence>
  );
}

function ModalContenu({
  projet,
  onClose,
}: {
  projet: Projet;
  onClose: () => void;
}) {
  const [imageIndex, setImageIndex] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titreId = useId();
  const nbImages = projet.images.length;

  const precedente = () => setImageIndex((i) => (i - 1 + nbImages) % nbImages);
  const suivante = () => setImageIndex((i) => (i + 1) % nbImages);

  useEffect(() => {
    const elementAvant =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const overflowAvant = document.body.style.overflow;

    dialogRef.current?.focus();
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflowAvant;
      elementAvant?.focus();
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowLeft") {
        setImageIndex((i) => (i - 1 + nbImages) % nbImages);
        return;
      }
      if (e.key === "ArrowRight") {
        setImageIndex((i) => (i + 1) % nbImages);
        return;
      }
      if (e.key === "Tab") {
        const liste = dialogRef.current?.querySelectorAll<HTMLElement>(FOCALISABLES);
        if (!liste || liste.length === 0) return;
        const premier = liste[0];
        const dernier = liste[liste.length - 1];
        const actif = document.activeElement;

        if (e.shiftKey && (actif === premier || actif === dialogRef.current)) {
          e.preventDefault();
          dernier.focus();
        } else if (!e.shiftKey && actif === dernier) {
          e.preventDefault();
          premier.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, nbImages]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-fond/80 p-4 backdrop-blur-md sm:p-6"
      onClick={onClose}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titreId}
        tabIndex={-1}
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-trait bg-fond-doux shadow-2xl shadow-black/50 outline-none"
      >
        {/* Bouton fermer */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-trait bg-fond/90 text-encre-douce backdrop-blur-sm transition hover:border-indigo hover:text-indigo"
        >
          <X size={18} aria-hidden="true" />
        </button>

        {/* Zone scrollable */}
        <div className="overflow-y-auto">
          {/* Carrousel d'images */}
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-violet-doux">
            <AnimatePresence mode="wait">
              <motion.div
                key={imageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0"
              >
                <Image
                  src={projet.images[imageIndex]}
                  alt={`${projet.titre} — image ${imageIndex + 1} sur ${nbImages}`}
                  fill
                  sizes="(min-width: 768px) 768px, 100vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>

            {nbImages > 1 && (
              <>
                <button
                  type="button"
                  onClick={precedente}
                  aria-label="Image précédente"
                  className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-trait bg-fond/80 text-encre backdrop-blur-sm transition hover:border-indigo hover:text-indigo"
                >
                  <ArrowLeft size={18} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={suivante}
                  aria-label="Image suivante"
                  className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-trait bg-fond/80 text-encre backdrop-blur-sm transition hover:border-indigo hover:text-indigo"
                >
                  <ArrowRight size={18} aria-hidden="true" />
                </button>

                <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                  {projet.images.map((_, i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => setImageIndex(i)}
                      aria-label={`Image ${i + 1}`}
                      aria-current={i === imageIndex}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === imageIndex
                          ? "w-6 bg-indigo"
                          : "w-1.5 bg-encre/40 hover:bg-encre/70"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Contenu */}
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-trait bg-fond px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-widest text-indigo">
                {projet.type}
              </span>
              <span className="rounded-full border border-trait bg-fond px-2.5 py-1 font-mono text-[10px] font-medium text-encre-douce">
                {projet.annee}
              </span>
            </div>

            <h2
              id={titreId}
              className="mt-4 font-titre text-3xl font-bold text-encre sm:text-4xl"
            >
              {projet.titre}
            </h2>

            <p className="mt-4 leading-relaxed text-encre-douce">
              {projet.descriptionLongue}
            </p>

            <div className="mt-8 space-y-5 border-t border-trait pt-6">
              <div>
                <h3 className="font-mono text-xs font-medium uppercase tracking-widest text-indigo">
                  ❓ Le problème
                </h3>
                <p className="mt-2 leading-relaxed text-encre-douce">
                  {projet.probleme}
                </p>
              </div>

              <div>
                <h3 className="font-mono text-xs font-medium uppercase tracking-widest text-indigo">
                  🛠️ Ce que j&apos;ai fait
                </h3>
                <p className="mt-2 leading-relaxed text-encre-douce">
                  {projet.fait}
                </p>
              </div>

              <div>
                <h3 className="font-mono text-xs font-medium uppercase tracking-widest text-indigo">
                  💡 Ce que j&apos;ai appris
                </h3>
                <p className="mt-2 leading-relaxed text-encre-douce">
                  {projet.appris}
                </p>
              </div>
            </div>

            {/* Stack */}
            <div className="mt-8 border-t border-trait pt-6">
              <h3 className="font-mono text-xs font-medium uppercase tracking-widest text-encre-douce">
                Stack
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {projet.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md border border-trait bg-fond px-2.5 py-1 font-mono text-xs text-encre-douce"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            {/* ══ Liens (démo / télécharger / code) ══ */}
            {(projet.demo || projet.download || projet.github) && (
              <div className="mt-8 flex flex-wrap gap-3 border-t border-trait pt-6">
                {projet.demo && (
                  <a
                    href={projet.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-indigo px-5 py-2.5 font-sous text-sm font-medium text-fond transition hover:bg-indigo-fonce"
                  >
                    <ExternalLink size={16} aria-hidden="true" />
                    Voir la démo
                  </a>
                )}

                {projet.download && (
                  <a
                    href={projet.download}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 font-sous text-sm font-medium text-white transition hover:bg-emerald-600"
                  >
                    <Download size={16} aria-hidden="true" />
                    Télécharger
                  </a>
                )}

                {projet.github && (
                  <a
                    href={projet.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-trait px-5 py-2.5 font-sous text-sm font-medium text-encre transition hover:border-indigo hover:text-indigo"
                  >
                    <Code2 size={16} aria-hidden="true" />
                    Code source
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}