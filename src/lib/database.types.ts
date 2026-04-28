/**
 * Types générés pour correspondre aux tables Supabase.
 * À régénérer avec : npx supabase gen types typescript --project-id <id> > src/lib/database.types.ts
 */
export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      events: {
        Row: {
          id: string
          title: string
          date: string
          location: string
          type: 'Conférence' | 'Atelier' | 'Webinaire' | 'Networking'
          summary: string
          link: string | null
          is_past: boolean
          image: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['events']['Row'], 'created_at'>
        Update: Partial<Database['public']['Tables']['events']['Insert']>
      }
      experts: {
        Row: {
          id: string
          name: string
          avatar: string
          specialty: string
          location: string
          sectors: string[]
          expertise: string[]
          level: 'Conseil' | 'Accompagnement' | 'Formation' | 'Développement'
          description: string
          website: string | null
          email: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['experts']['Row'], 'created_at'>
        Update: Partial<Database['public']['Tables']['experts']['Insert']>
      }
      news: {
        Row: {
          id: string
          title: string
          category: 'IA générative' | 'Industrie' | 'Réglementation' | 'Outils' | 'Territoire' | 'Innovation'
          date: string
          summary: string
          image: string | null
          read_time: number
          is_hero: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['news']['Row'], 'created_at'>
        Update: Partial<Database['public']['Tables']['news']['Insert']>
      }
      trainings: {
        Row: {
          id: string
          title: string
          provider: string
          level: 'Débutant' | 'Intermédiaire' | 'Avancé'
          format: 'En ligne' | 'Présentiel' | 'Mixte'
          profile: 'Dirigeants' | 'Managers / Métiers' | 'Profils techniques' | 'Collectivités'
          objective: string
          duration: string
          link: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['trainings']['Row'], 'created_at'>
        Update: Partial<Database['public']['Tables']['trainings']['Insert']>
      }
    }
  }
}
