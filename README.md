# IA Loire Valley

Plateforme numérique régionale d'orientation et d'accompagnement à l'Intelligence Artificielle en Centre-Val de Loire.

Développée par le **LAB'IA Loire Valley** en partenariat avec la **Jeune Chambre Économique d'Orléans (JCEO)** et les étudiants de **CODA**, cette plateforme ambitionne de devenir le guichet unique d'entrée IA pour les entrepreneurs et acteurs de la région.

---

## Fonctionnalités

- **Découvrir l'IA** — introduction aux fondamentaux de l'intelligence artificielle
- **Annuaire** — experts IA et ambassadeurs « Osez l'IA » géolocalisés sur carte interactive
- **Se former** — catalogue de formations filtrables (niveau, format, recherche libre)
- **Aides & financements** — recensement des dispositifs publics nationaux et régionaux
- **Agenda** — événements IA du territoire
- **Actualités** — veille et articles sur l'IA en région
- **Diagnostic IA** — questionnaire en 7 étapes pour évaluer la maturité numérique d'une structure
- **Bilan d'orientation** — quiz interactif pour orienter vers les bons dispositifs

---

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Framework | React 19 + TypeScript |
| Build | Vite 8 |
| Style | Tailwind CSS v4 |
| CMS | Sanity v3 |
| Carte | Leaflet / React-Leaflet |
| Formulaires | React Hook Form + Zod |
| Animations | Framer Motion |
| Icônes | Lucide React |
| Routage | React Router v7 |

---

## Installation

```bash
# Cloner le dépôt
git clone <url-du-repo>
cd ia-loire-valley

# Installer les dépendances
npm install

# Lancer en développement
npm run dev
```

---

## Variables d'environnement

Créer un fichier `.env` à la racine :

```env
VITE_SANITY_PROJECT_ID=xxxxxxxxxxxx
VITE_SANITY_DATASET=production
VITE_FORMSPREE_DIAGNOSTIC_ID=xxxxxxxxxxxx
```

---

## Scripts disponibles

```bash
npm run dev       # Serveur de développement
npm run build     # Build de production (tsc + vite)
npm run preview   # Prévisualisation du build
npm run lint      # Vérification ESLint
```

---

## Sanity Studio

Le CMS Sanity est embarqué dans `/sanity-studio`. Pour le lancer séparément :

```bash
cd sanity-studio
npm install
npm run dev
```

### Seed des données

Des scripts de seed sont disponibles dans `/scripts` pour initialiser les collections Sanity :

```bash
SANITY_TOKEN=xxx node scripts/seed-trainings.mjs
SANITY_TOKEN=xxx node scripts/seed-aides.mjs
SANITY_TOKEN=xxx node scripts/seed-partenaires.mjs
SANITY_TOKEN=xxx node scripts/seed-platforms.mjs
```

---

## Structure du projet

```
src/
├── assets/          # Images et fichiers statiques importés
├── components/      # Composants réutilisables (UI, carte, experts…)
├── hooks/           # Hooks React (useData, useExperts…)
├── pages/           # Pages de l'application
├── services/        # Appels API (Sanity, géocodage, ambassadeurs…)
├── types/           # Types TypeScript partagés
└── utils/           # Utilitaires (formatPhone…)
public/              # Assets publics (logos, favicons…)
sanity-studio/       # Studio Sanity (schémas, configuration)
scripts/             # Scripts de seed Sanity
```

---

## Déploiement

```bash
npm run build
# Le dossier dist/ contient le build statique à déployer
```

Le fichier `public/.htaccess` est configuré pour Apache (redirection SPA).
