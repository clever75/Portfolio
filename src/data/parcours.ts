export type EtapeParcours = {
  numero: string;
  titre: string;
  description: string;
  annee: string;
};

export const parcours: EtapeParcours[] = [
  {
    numero: "01",
    titre: "BTS Développement d'Applications",
    description: "Institut Polytechnique DEFITECH",
    annee: "2024 — 2026",
  },
  {
    numero: "02",
    titre: "Cinq projets web et desktop",
    description:
      "Réalisés pendant le BTS — 2 applications web, 3 applications desktop.",
    annee: "2026",
  },
  {
    numero: "03",
    titre: "Aujourd'hui",
    description: "En recherche active d'un stage.",
    annee: "2026 — en cours",
  },
];

// Fiche profil (déplacée depuis About)
export const ficheProfil = [
  {
    id: "formation",
    label: "Formation",
    titre: "BTS Développement d'Applications",
    detail: "Institut Polytechnique DEFITECH",
  },
  {
    id: "lieu",
    label: "Lieu",
    titre: "Lomé, Togo",
    detail: null,
  },
  {
    id: "recherche",
    label: "Recherche",
    titre: "Stage • Freelance • Projet ponctuel",
    detail: null,
  },
];