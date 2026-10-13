"use client";

import Image from "next/image";
import { ArrowRight, ExternalLink, Code2, Clock } from "lucide-react";
import type { Projet } from "@/data/projets";
import { getTechIcon } from "@/data/techIcons";

type ProjetCardProps = {
  projet: Projet;
  featured?: boolean;
  onClick: () => void;
};

export default function ProjetCard({
  projet,
  featured = false,
  onClick,
}: ProjetCardProps) {
  return (
    <button
      onClick={onClick}
      aria-label={`Voir le projet ${projet.titre}`}
      className={`
        group relative flex h-full w-full flex-col overflow-hidden rounded-2xl
        border border-trait bg-fond-doux text-left
        transition-all duration-500
        hover:-translate-y-1 hover:border-indigo/40
        hover:shadow-2xl hover:shadow-indigo/20
        focus-visible:border-indigo
      `}
    >
      {/* ══ IMAGE + OVERLAY ══ */}
      <div className="p-3 pb-0">
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-trait/60 bg-violet-doux">
          <Image
            src={projet.images[0]}
            alt={`Aperçu du projet ${projet.titre}`}
            fill
            sizes={
              featured
                ? "(min-width: 1024px) 60vw, 100vw"
                : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            }
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Overlay violet au survol */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center bg-indigo/0 opacity-0 transition-all duration-500 group-hover:bg-indigo/30 group-hover:opacity-100"
          >
            <span className="inline-flex translate-y-2 items-center gap-2 rounded-full border border-encre/30 bg-fond/90 px-4 py-2 font-sous text-sm font-medium text-encre backdrop-blur-sm transition-transform duration-500 group-hover:translate-y-0">
              Voir le projet
              <ArrowRight size={14} aria-hidden="true" />
            </span>
          </div>

          {/* Badge type */}
          <span className="absolute left-3 top-3 rounded-full border border-trait bg-fond/80 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-widest text-indigo backdrop-blur-sm">
            {projet.type}
          </span>

          {/* Badge année */}
          <span className="absolute right-3 top-3 rounded-full border border-trait bg-fond/80 px-2.5 py-1 font-mono text-[10px] font-medium text-encre-douce backdrop-blur-sm">
            {projet.annee}
          </span>

          {/* ══ Badge "En ligne" ══ */}
          {projet.demo && (
            <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/90 px-2.5 py-1 font-mono text-[10px] font-medium text-white backdrop-blur-sm">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
              En ligne
            </span>
          )}
        </div>
      </div>

      {/* ══ CONTENU ══ */}
      <div className={`flex flex-1 flex-col p-6 ${featured ? "lg:p-8" : ""}`}>
        <h3
          className={`font-sous font-semibold text-encre ${
            featured ? "text-2xl lg:text-3xl" : "text-xl"
          }`}
        >
          {projet.titre}
        </h3>

        <p
          className={`mt-3 leading-relaxed text-encre-douce ${
            featured ? "text-base lg:text-lg" : "line-clamp-3 text-sm"
          }`}
        >
          {projet.description}
        </p>

        {/* ══ Stack avec icônes ══ */}
        <ul className="mt-5 flex flex-wrap gap-2">
          {projet.stack.map((tech) => {
            const icon = getTechIcon(tech);
            return (
              <li
                key={tech}
                className="inline-flex items-center gap-1.5 rounded-md border border-trait bg-fond px-2 py-1 font-mono text-[11px] text-encre-douce"
                title={icon?.label ?? tech}
              >
                {icon ? (
                  <img
                    src={icon.url}
                    alt=""
                    aria-hidden="true"
                    className="h-3.5 w-3.5 object-contain"
                  />
                ) : null}
                <span>{tech}</span>
              </li>
            );
          })}
        </ul>

        {/* ══ Boutons d'action directs ══ */}
        <div className="mt-auto flex items-center gap-2 border-t border-trait pt-5">
          {projet.demo ? (
            <a
              href={projet.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-indigo px-3 py-2 font-sous text-xs font-medium text-fond transition hover:bg-indigo-fonce"
            >
              <ExternalLink size={13} aria-hidden="true" />
              Voir la démo
            </a>
          ) : (
            <span className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-trait px-3 py-2 font-sous text-xs font-medium text-encre-douce/50">
              <Clock size={13} aria-hidden="true" />
              Bientôt en ligne
            </span>
          )}

          {projet.github && (
            <a
              href={projet.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={`Code source de ${projet.titre}`}
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-trait px-3 py-2 font-sous text-xs font-medium text-encre transition hover:border-indigo hover:text-indigo"
            >
              <Code2 size={13} aria-hidden="true" />
              Code
            </a>
          )}
        </div>
      </div>
    </button>
  );
}