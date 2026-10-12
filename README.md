# Portfolio — ASSAN Ablavi Clever

Portfolio personnel de **Clever**, développeuse d'applications basée à Lomé, Togo.

> **Comprendre à fond, construire juste.**

---

## 🎯 À propos

Ce portfolio présente mon parcours, mes projets et mes compétences. Il a été conçu et développé entièrement par moi — du design à la mise en production.

## 🚀 Stack technique

- **Framework** : Next.js 16 (App Router)
- **Langage** : TypeScript
- **Styling** : Tailwind CSS v4
- **Animations** : Framer Motion
- **Icônes** : Lucide React + React Icons
- **Formulaire** : Resend + Cloudflare Turnstile
- **Déploiement** : Vercel

## ✨ Fonctionnalités

- Design sombre avec palette personnalisée
- Animations au scroll (Framer Motion)
- Curseur personnalisé
- Horloge en direct (Lomé)
- Formulaire de contact sécurisé (Turnstile + honeypot + rate limiting)
- Filtres sur les projets (Web / Desktop)
- Modale détaillée avec carrousel d'images
- Responsive mobile / tablette / desktop

## 🛠️ Installation locale

```bash
# Cloner le repo
git clone https://github.com/clever75/Portfolio.git

# Installer les dépendances
npm install

# Créer un fichier .env.local avec les variables suivantes
RESEND_API_KEY=re_...
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x...
TURNSTILE_SECRET_KEY=0x...

# Lancer le serveur de dev
npm run dev