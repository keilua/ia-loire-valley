import type { Ambassadeur } from '../types'

const API = 'https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/ambassadeursia/records'

export async function fetchAmbassadeurs(): Promise<Ambassadeur[]> {
  const res = await fetch(`${API}?where=region%3D%22CVL%22&limit=100`)
  const data = await res.json()

  return (data.results ?? []).map((r: Record<string, unknown>, i: number) => ({
    id: `amb-${i}`,
    prenom: (r.prenom as string) ?? '',
    nom: (r.nom as string) ?? '',
    organisation: (r.nom_organisation as string) ?? '',
    type: (r.type_d_ambassadeur as string) === 'Sectoriel' ? 'Sectoriel' : 'Régional',
    secteur: (r.secteur as string) ?? undefined,
    email: (r.mail as string) ?? undefined,
    phone: (r.telephone as string) ?? undefined,
    commentaires: (r.commentaires as string) ?? undefined,
  }))
}
