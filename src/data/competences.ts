import {
  Globe,
  Monitor,
  Database,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type Techno = {
  nom: string;
  logo?: string;      // URL Devicon (CDN)
  invert?: boolean;   // pour les logos noirs sur fond sombre
  couleur?: string;   // couleur d'accent (pour le point si pas de logo)
};

export type SousCategorie = {
  label: string;
  items: Techno[];
};

export type CategorieCompetence = {
  id: string;
  icon: LucideIcon;
  titre: string;
  sousCategories: SousCategorie[];
};

// Base CDN Devicon
const CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

export const competences: CategorieCompetence[] = [
  {
    id: "web",
    icon: Globe,
    titre: "Web",
    sousCategories: [
      {
        label: "Front-end",
        items: [
          { nom: "HTML",       logo: `${CDN}/html5/html5-original.svg`,           couleur: "#E34F26" },
          { nom: "CSS",        logo: `${CDN}/css3/css3-original.svg`,              couleur: "#1572B6" },
          { nom: "JavaScript", logo: `${CDN}/javascript/javascript-original.svg`,  couleur: "#F7DF1E" },
          { nom: "TypeScript", logo: `${CDN}/typescript/typescript-original.svg`,  couleur: "#3178C6" },
          { nom: "React",      logo: `${CDN}/react/react-original.svg`,            couleur: "#61DAFB" },
          { nom: "Next.js",    logo: `${CDN}/nextjs/nextjs-original.svg`,          invert: true },
        ],
      },
      {
        label: "Back-end",
        items: [
          { nom: "PHP",      logo: `${CDN}/php/php-original.svg`,                  couleur: "#777BB4" },
          { nom: "Node.js",  logo: `${CDN}/nodejs/nodejs-original.svg`,            couleur: "#339933" },
          { nom: "Express",  logo: `${CDN}/express/express-original.svg`,          invert: true },
        ],
      },
    ],
  },
  {
    id: "desktop",
    icon: Monitor,
    titre: "Desktop",
    sousCategories: [
      {
        label: "Applications",
        items: [
          { nom: "Java Swing", logo: `${CDN}/java/java-original.svg`,              couleur: "#E76F00" },
          { nom: "VB.NET",     logo: `${CDN}/visualbasic/visualbasic-original.svg`, couleur: "#512BD4" },
          { nom: "Electron",   logo: `${CDN}/electron/electron-original.svg`,      couleur: "#47848F" },
        ],
      },
    ],
  },
  {
    id: "bdd",
    icon: Database,
    titre: "Bases de données",
    sousCategories: [
      {
        label: "SGBD",
        items: [
          { nom: "MySQL",      logo: `${CDN}/mysql/mysql-original.svg`,            couleur: "#4479A1" },
          { nom: "PostgreSQL", logo: `${CDN}/postgresql/postgresql-original.svg`,  couleur: "#4169E1" },
          { nom: "SQLite",     logo: `${CDN}/sqlite/sqlite-original.svg`,          couleur: "#003B57" },
        ],
      },
      {
        label: "Compétences",
        items: [
          { nom: "Modélisation", couleur: "#6366f1" },
          { nom: "Requêtes SQL", couleur: "#6366f1" },
        ],
      },
    ],
  },
  {
    id: "outils",
    icon: Wrench,
    titre: "Outils",
    sousCategories: [
      {
        label: "Versioning",
        items: [
          { nom: "Git",    logo: `${CDN}/git/git-original.svg`,                    couleur: "#F05032" },
          { nom: "GitHub", logo: `${CDN}/github/github-original.svg`,              invert: true },
        ],
      },
      {
  label: "Éditeurs",
  items: [
    { nom: "VS Code",         logo: `${CDN}/vscode/vscode-original.svg`,     couleur: "#007ACC" },
    { nom: "Apache NetBeans", logo: `${CDN}/netbeans/netbeans-original.svg`, couleur: "#1B6AC6" },
    { nom: "Visual Studio",   logo: `${CDN}/visualstudio/visualstudio-original.svg`, couleur: "#5C2D91" },
  ],
},
    ],
  },
];

// Phrase de fin
export const phraseFin =
  "Cette liste évolue. J'apprends en construisant — pas en cochant des cases.";