import type { Stat, Partner } from '../types'

export const stats: Stat[] = [
  { label: 'Experts référencés', value: '80+', description: 'dans la région' },
  { label: 'Projets accompagnés', value: '200+', description: 'depuis 2022' },
  { label: 'Entreprises orientées', value: '1 200', description: 'PME, ETI, startups' },
  { label: 'Aides identifiées', value: '35+', description: 'dispositifs nationaux & régionaux' },
]

export const partners: Partner[] = [
  { id: '1', name: 'Région Centre-Val de Loire', type: 'Institution' },
  { id: '2', name: 'BPI France', type: 'Institution' },
  { id: '3', name: 'CCI Centre-Val de Loire', type: 'Institution' },
  { id: '4', name: 'INSA Centre-Val de Loire', type: 'Académique' },
  { id: '5', name: 'Université de Tours', type: 'Académique' },
  { id: '6', name: 'Digital Loire Valley', type: 'Entreprise' },
  { id: '7', name: 'Orléans Métropole', type: 'Institution' },
  { id: '8', name: 'Tours Métropole', type: 'Institution' },
]
