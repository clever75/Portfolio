export type EtapeParcours = {
  numero: string;
  titre: string;
  description: string;
  annee: string;
};

export const parcours: EtapeParcours[] = [
  {
    numero: "01",
    titre: "Baccalauréat série D",
    description: "Institut Agla Étoile du Matin",
    annee: "2024",
  },
  {
    numero: "02",
    titre: "BTS Développement d'Applications",
    description: "Institut Polytechnique DEFITECH",
    annee: "2024 — 2026",
  },
  {
    numero: "03",
    titre: "Cinq projets web et desktop",
    description:
      "Réalisés pendant le BTS — 2 applications web, 3 applications desktop.",
    annee: "2026",
  },
  {
    numero: "04",
    titre: "Aujourd'hui",
    description: "En recherche active d'un stage.",
    annee: "2026 — en cours",
  },
];