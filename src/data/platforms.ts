import type { Platform } from '../types'

export const platforms: Platform[] = [
  { id: '1', name: 'France Université Numérique (FUN)', type: 'MOOC gratuits', topics: 'Bases de l\'IA, machine learning, IA et société', url: 'https://www.fun-mooc.fr', free: true, order: 1 },
  { id: '2', name: 'Google – Fondamentaux de l\'IA', type: 'Cours en ligne gratuit', topics: 'IA générative, Gemini, Machine Learning, Google Cloud', url: 'https://grow.google/intl/fr_fr/learn-skills/ai/', free: true, order: 2 },
  { id: '3', name: 'Microsoft – AI Skills Initiative', type: 'Parcours gratuits', topics: 'Copilot, Azure AI, IA responsable, outils Microsoft 365', url: 'https://www.microsoft.com/fr-fr/ai/ai-skills', free: true, order: 3 },
  { id: '4', name: 'INRIA – Classe IA', type: 'MOOC gratuit', topics: 'Comprendre l\'IA, éthique, algorithmes, données', url: 'https://www.fun-mooc.fr/fr/cours/lintelligence-artificielle-avec-intelligence/', free: true, order: 4 },
  { id: '5', name: 'Coursera – IA for Everyone', type: 'Cours (audit gratuit)', topics: 'Stratégie IA pour non-techniques, cas d\'usage, feuille de route', url: 'https://www.coursera.org/learn/ai-for-everyone', free: true, order: 5 },
  { id: '6', name: 'OpenClassrooms', type: 'Parcours certifiants', topics: 'Data science, IA appliquée, développement IA', url: 'https://openclassrooms.com', free: false, order: 6 },
  { id: '7', name: 'Simplon.co', type: 'Formations intensives', topics: 'Data, IA, développement — formations accessibles et financées', url: 'https://simplon.co', free: false, order: 7 },
  { id: '8', name: 'Organismes locaux partenaires', type: 'Formations présentielles CVL', topics: 'Formations sur-mesure pour entreprises de la région', url: '/experts', free: false, order: 8 },
]
