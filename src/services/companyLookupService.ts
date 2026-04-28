import type { CompanyInfo } from '../types'

export interface CompanyLookupResult {
  success: boolean
  data?: CompanyInfo
  error?: string
}

/**
 * Recherche les informations d'une entreprise par SIRET.
 * Utilise l'API officielle française recherche-entreprises.api.gouv.fr
 * — gratuite, sans clé API, données INSEE en temps réel.
 */
export async function lookupCompanyBySiret(siret: string): Promise<CompanyLookupResult> {
  const cleanSiret = siret.replace(/\s/g, '')

  if (cleanSiret.length !== 14 || !/^\d+$/.test(cleanSiret)) {
    return { success: false, error: 'Le SIRET doit contenir exactement 14 chiffres.' }
  }

  // Le SIREN = les 9 premiers chiffres du SIRET
  const siren = cleanSiret.slice(0, 9)

  try {
    const res = await fetch(
      `https://recherche-entreprises.api.gouv.fr/search?q=${siren}&page=1&per_page=1`,
      { signal: AbortSignal.timeout(8000) }
    )

    if (!res.ok) {
      return { success: false, error: `Erreur API (${res.status}). Réessayez ou renseignez manuellement.` }
    }

    const json = await res.json()
    const result = json.results?.[0]

    if (!result) {
      return {
        success: false,
        error: 'Entreprise non trouvée. Vérifiez le SIRET ou renseignez les informations manuellement.',
      }
    }

    const siege = result.siege ?? {}

    const data: CompanyInfo = {
      siret: cleanSiret,
      raisonSociale: result.nom_raison_sociale ?? result.nom_complet ?? '',
      adresse: siege.adresse ?? '',
      codePostal: siege.code_postal ?? '',
      ville: siege.libelle_commune ?? '',
      codeNAF: siege.activite_principale ?? result.activite_principale ?? '',
      libelleNAF: siege.libelle_activite_principale ?? '',
      formeJuridique: result.libelle_nature_juridique ?? '',
    }

    return { success: true, data }
  } catch (err) {
    const message = err instanceof Error && err.name === 'TimeoutError'
      ? 'La recherche a expiré. Vérifiez votre connexion ou renseignez manuellement.'
      : 'Impossible de contacter l\'API. Renseignez les informations manuellement.'
    return { success: false, error: message }
  }
}

export function formatSiret(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 14)
  return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{5})/, '$1 $2 $3 $4')
}
