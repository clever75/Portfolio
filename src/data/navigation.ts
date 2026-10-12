export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/#apropos" },
  { label: "Projets", href: "/#projets" },
  { label: "Compétences", href: "/#competences" },
  { label: "Parcours", href: "/#parcours" },
  { label: "Contact", href: "/#contact" },
];