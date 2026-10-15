// data/techIcons.ts
// Mapping entre le nom de la techno et son logo Devicon (CDN jsDelivr)

export type TechIcon = {
  url: string;
  label: string;
  invert?: boolean; // true = inverser les couleurs (logos noirs sur fond sombre)
};

export const TECH_ICONS: Record<string, TechIcon> = {
  // ── Web frontend ──
  HTML:        { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",       label: "HTML5" },
  CSS:         { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",          label: "CSS3" },
  JavaScript:  { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", label: "JavaScript" },
  TypeScript:  { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", label: "TypeScript" },
  React:       { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",       label: "React" },
  Next:        { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",     label: "Next.js", invert: true },
  "Next.js":   { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",     label: "Next.js", invert: true },
  Tailwind:    { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", label: "Tailwind" },

  // ── Backend ──
  PHP:         { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",            label: "PHP" },
  Python:      { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",      label: "Python" },
  Node:        { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",      label: "Node.js" },
  "Node.js":   { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",      label: "Node.js" },
  Express:     { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",    label: "Express", invert: true },
  Laravel:     { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",    label: "Laravel" },

  // ── Bases de données ──
  MySQL:       { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",        label: "MySQL" },
  PostgreSQL:  { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", label: "PostgreSQL" },
  MongoDB:     { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",    label: "MongoDB" },
  SQLite:      { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",      label: "SQLite" },

  // ── Desktop ──
  "Java Swing": { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",         label: "Java Swing" },
  Java:         { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",         label: "Java" },
  "VB.NET":     { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualbasic/visualbasic-original.svg", label: "VB.NET" },
  ".NET":       { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg",   label: ".NET" },

  // ── Outils ──
  Git:         { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",            label: "Git" },
  GitHub:      { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",      label: "GitHub", invert: true },
  Figma:       { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",        label: "Figma" },
  VSCode:      { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",      label: "VS Code" },
  "VS Code":   { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",      label: "VS Code" },
  IntelliJ:    { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg",  label: "IntelliJ IDEA" },
  "IntelliJ IDEA": { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg", label: "IntelliJ IDEA" },
  WebStorm:    { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webstorm/webstorm-original.svg",  label: "WebStorm" },
};

export function getTechIcon(nom: string) {
  return TECH_ICONS[nom] ?? null;
}