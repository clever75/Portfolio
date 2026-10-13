// data/techIcons.ts
// Mapping entre le nom de la techno (tel qu'il apparaît dans `stack`) 
// et l'URL de son logo (via le CDN devicon)

export const TECH_ICONS: Record<string, { url: string; label: string }> = {
  // ── Web frontend ──
  HTML:        { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",       label: "HTML5" },
  CSS:         { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",          label: "CSS3" },
  JavaScript:  { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", label: "JavaScript" },
  TypeScript:  { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", label: "TypeScript" },
  React:       { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",       label: "React" },
  Next:        { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",     label: "Next.js" },
  Tailwind:    { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", label: "Tailwind" },

  // ── Backend ──
  PHP:         { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",            label: "PHP" },
  Python:      { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",      label: "Python" },
  Node:        { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",      label: "Node.js" },
  Laravel:     { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",    label: "Laravel" },

  // ── Bases de données ──
  MySQL:       { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",        label: "MySQL" },
  PostgreSQL:  { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", label: "PostgreSQL" },
  MongoDB:     { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",    label: "MongoDB" },

  // ── Desktop ──
  "Java Swing": { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",         label: "Java Swing" },
  Java:         { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",         label: "Java" },
  "VB.NET":     { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualbasic/visualbasic-original.svg", label: "VB.NET" },
  ".NET":       { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg",   label: ".NET" },

  // ── Outils ──
  Git:         { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",            label: "Git" },
  GitHub:      { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",      label: "GitHub" },
  Figma:       { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",        label: "Figma" },
};

// Retourne l'icône si elle existe, sinon null
export function getTechIcon(nom: string) {
  return TECH_ICONS[nom] ?? null;
}