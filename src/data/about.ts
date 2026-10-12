import { GraduationCap, MapPin, Briefcase } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type AboutFact = {
  label: string;
  value: string;
  Icon: LucideIcon;
};

export const aboutFacts: AboutFact[] = [
  {
    label: "Formation",
    value: "BTS Développement d'Applications, Institut Polytechnique DEFITECH",
    Icon: GraduationCap,
  },
  {
    label: "Lieu",
    value: "Lomé, Togo",
    Icon: MapPin,
  },
  {
    label: "Je recherche",
    value:
      "Toute mission, quelle qu'en soit la durée : stage, freelance ou projet ponctuel",
    Icon: Briefcase,
  },
];