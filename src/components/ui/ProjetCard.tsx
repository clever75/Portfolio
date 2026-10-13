"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Projet } from "@/data/projets";

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
      {/* Image + overlay */}
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

          {/* Badge "En ligne" (si projet déployé) */}
          {projet.demo && (
            <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/90 px-2.5 py-1 font-mono text-[10px] font-medium text-white backdrop-blur-sm">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
              En ligne
            </span>
          )}
        </div>
      </div>

      {/* Contenu */}
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

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {projet.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-trait bg-fond px-2 py-0.5 font-mono text-[11px] text-encre-douce"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center gap-4 border-t border-trait pt-5">
          <span className="group/link inline-flex items-center gap-1.5 font-sous text-sm font-medium text-indigo">
            Voir le projet
            <ArrowRight
              size={16}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover/link:translate-x-0.5"
            />
          </span>
        </div>
      </div>
    </button>
  );
}