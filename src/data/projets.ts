export type Projet = {
  id: string;
  titre: string;
  type: "Web" | "Desktop";
  description: string;          // courte, pour la carte
  descriptionLongue: string;    // longue, pour la modale
  probleme: string;
  fait: string;
  appris: string;
  stack: string[];
  images: string[];             // 1ʳᵉ image = aperçu de la carte
  demo?: string;
  github?: string;
  annee: string;
};

export const projets: Projet[] = [
  {
    id: "quartier-alert",
    titre: "QuartierAlert",
    type: "Web",
    annee: "2026",
    description:
      "Plateforme citoyenne de signalement de problèmes de quartier (voirie, inondations, sécurité). Suivi du traitement en temps réel et système de soutien par les habitants.",
    descriptionLongue:
      "QuartierAlert est une plateforme web qui permet aux habitants de Lomé de signaler en 1 minute un problème dans leur quartier : route cassée, inondation, éclairage défaillant, sécurité. Chaque signalement peut être soutenu par les autres citoyens et suivi étape par étape jusqu'à sa résolution.",
    probleme:
      "À Lomé, signaler un problème de quartier se fait au bouche-à-oreille. Aucun suivi, aucune visibilité, et les problèmes s'accumulent sans jamais être traités.",
    fait:
      "J'ai conçu la base de données, le système d'authentification, la création et le suivi des signalements, ainsi que le système de soutien entre citoyens.",
    appris:
      "Gérer un vrai projet avec un vrai besoin derrière — pas juste un exercice scolaire. Prioriser les fonctionnalités qui servent vraiment.",
    stack: ["HTML", "CSS", "PHP", "MySQL"],
    images: [
      "/projets/quartier-alert.jpg",
      // Ajoute d'autres images ici quand tu les as :
      // "/projets/quartier-alert-2.jpg",
    ],
  },
  {
    id: "petmarket",
    titre: "PetMarket",
    type: "Web",
    annee: "2026",
    description:
      "Plateforme de vente d'animaux mettant en relation vendeurs et acheteurs à Lomé. Recherche, fiches détaillées, contact direct entre les deux parties.",
    descriptionLongue:
      "PetMarket est une place de marché qui met en relation les éleveurs et les acheteurs d'animaux à Lomé. Les vendeurs publient leurs annonces, les acheteurs recherchent par catégorie et contactent directement le vendeur.",
    probleme:
      "Les éleveurs de Lomé n'avaient aucun moyen simple de vendre leurs animaux en ligne. Tout se faisait via WhatsApp et bouche-à-oreille, sans visibilité.",
    fait:
      "J'ai conçu le catalogue, la recherche par catégorie, les fiches détaillées des animaux, et le système de mise en relation entre vendeur et acheteur.",
    appris:
      "Structurer une base de données pour un catalogue riche et concevoir une expérience de recherche fluide.",
    stack: ["HTML", "CSS", "PHP", "MySQL"],
    images: [
      "/projets/petmarket.jpg",
      // "/projets/petmarket-2.jpg",
    ],
  },
  {
    id: "bibliogest",
    titre: "BiblioGest",
    type: "Desktop",
    annee: "2026",
    description:
      "Application desktop de gestion de bibliothèque : livres, lecteurs, emprunts, retards, statistiques. Tableau de bord complet pour l'administrateur.",
    descriptionLongue:
      "BiblioGest est une application desktop complète pour gérer une bibliothèque : catalogue de livres, gestion des lecteurs, emprunts, retours, alertes de retard, et statistiques en temps réel.",
    probleme:
      "Les petites bibliothèques gèrent souvent leurs emprunts sur papier. Résultat : pertes de livres, retards non suivis, aucune visibilité sur l'activité.",
    fait:
      "J'ai développé l'interface complète avec Java Swing, conçu la base MySQL, et implémenté la logique d'emprunt, de retour et d'alerte de retard.",
    appris:
      "Concevoir une interface desktop ergonomique avec Java Swing, et structurer une application en couches (UI / métier / données).",
    stack: ["Java Swing", "MySQL"],
    images: ["/projets/bibliogest.jpg"],
  },
  {
    id: "smartcaisse",
    titre: "SmartCaisse",
    type: "Desktop",
    annee: "2026",
    description:
      "Application de gestion de microfinance : clients, comptes, prêts, remboursements, transactions. Suivi des échéances et des prêts critiques.",
    descriptionLongue:
      "SmartCaisse est une application desktop qui gère l'activité complète d'une microfinance : clients, comptes, prêts, remboursements, épargne, et transactions quotidiennes. Avec un tableau de bord qui remonte les prêts critiques et les échéances à venir.",
    probleme:
      "Les petites structures de microfinance ont besoin de suivre prêts et remboursements au quotidien, mais les outils existants sont chers et mal adaptés au contexte local.",
    fait:
      "J'ai conçu et développé l'ensemble : gestion des clients, création de prêts, remboursements, calcul des pénalités de retard, et tableau de bord.",
    appris:
      "Gérer une logique métier complexe (calcul de pénalités, échéances, intérêts) et la traduire en interface claire.",
    stack: ["Java Swing", "MySQL"],
    images: ["/projets/smartcaisse.jpg"],
  },
  {
    id: "rosa-beauty",
    titre: "Rosa Beauty",
    type: "Desktop",
    annee: "2026",
    description:
      "Application de gestion de salon de beauté : rendez-vous, clients, employés, prestations, factures, stock produits et statistiques de revenus.",
    descriptionLongue:
      "Rosa Beauty est une application desktop de gestion complète pour un salon de beauté : prise de rendez-vous, gestion des clients et des employés, catalogue de prestations, facturation, stock de produits et statistiques de revenus.",
    probleme:
      "Les salons de beauté gèrent souvent leurs rendez-vous et leur stock sur cahier. Résultat : double réservation, oublis, et aucune vision sur les revenus réels.",
    fait:
      "J'ai développé l'application en VB.NET avec base SQL Server : planning des rendez-vous, gestion des employés, prestations, factures et alertes de stock.",
    appris:
      "Découvrir une nouvelle stack (VB.NET / SQL Server) et m'adapter à un contexte métier différent.",
    stack: ["VB.NET", "SQL Server"],
    images: ["/projets/rosa-beauty.jpg"],
  },
];