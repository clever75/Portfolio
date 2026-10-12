import {
  Globe,
  Monitor,
  Database,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiPhp,
  SiMysql,
  SiPostgresql,
  SiSqlite,
  SiNodedotjs,
  SiExpress,
  SiOpenjdk,
  SiDotnet,
  SiElectron,
  SiGit,
  SiGithub,
  SiIntellijidea,
  SiWebstorm,
} from "react-icons/si";
import type { IconType } from "react-icons";

export type Techno = {
  nom: string;
  icon: IconType | LucideIcon;
  couleur?: string;
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

export const competences: CategorieCompetence[] = [
  {
    id: "web",
    icon: Globe,
    titre: "Web",
    sousCategories: [
      {
        label: "Front-end",
        items: [
          { nom: "HTML", icon: SiHtml5, couleur: "#E34F26" },
          { nom: "CSS", icon: SiCss, couleur: "#1572B6" },
          { nom: "JavaScript", icon: SiJavascript, couleur: "#F7DF1E" },
          { nom: "TypeScript", icon: SiTypescript, couleur: "#3178C6" },
          { nom: "React", icon: SiReact, couleur: "#61DAFB" },
          { nom: "Next.js", icon: SiNextdotjs },
        ],
      },
      {
        label: "Back-end",
        items: [
          { nom: "PHP", icon: SiPhp, couleur: "#777BB4" },
          { nom: "Node.js", icon: SiNodedotjs, couleur: "#339933" },
          { nom: "Express", icon: SiExpress },
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
          { nom: "Java Swing", icon: SiOpenjdk, couleur: "#E76F00" },
          { nom: "VB.NET", icon: SiDotnet, couleur: "#512BD4" },
          { nom: "Electron", icon: SiElectron, couleur: "#47848F" },
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
          { nom: "MySQL", icon: SiMysql, couleur: "#4479A1" },
          { nom: "PostgreSQL", icon: SiPostgresql, couleur: "#4169E1" },
          { nom: "SQLite", icon: SiSqlite, couleur: "#003B57" },
        ],
      },
      {
        label: "Compétences",
        items: [
          { nom: "Modélisation", icon: Database },
          { nom: "Requêtes SQL", icon: Database },
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
          { nom: "Git", icon: SiGit, couleur: "#F05032" },
          { nom: "GitHub", icon: SiGithub },
        ],
      },
      {
        label: "Éditeurs",
        items: [
          { nom: "VS Code", icon: Wrench },
          { nom: "IntelliJ IDEA", icon: SiIntellijidea },
          { nom: "WebStorm", icon: SiWebstorm, couleur: "#00CDD7" },
        ],
      },
    ],
  },
];

// Phrase de fin
export const phraseFin =
  "Cette liste évolue. J'apprends en construisant — pas en cochant des cases.";