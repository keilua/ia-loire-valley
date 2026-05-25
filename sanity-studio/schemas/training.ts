import { defineType, defineField } from 'sanity'

export const trainingSchema = defineType({
  name: 'training',
  title: 'Formations',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre de la formation',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'provider',
      title: 'Organisme',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'level',
      title: 'Niveau',
      type: 'string',
      options: {
        list: [
          { title: 'Débutant', value: 'Débutant' },
          { title: 'Intermédiaire', value: 'Intermédiaire' },
          { title: 'Avancé', value: 'Avancé' },
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'format',
      title: 'Format',
      type: 'string',
      options: {
        list: [
          { title: 'En ligne', value: 'En ligne' },
          { title: 'Présentiel', value: 'Présentiel' },
          { title: 'Mixte', value: 'Mixte' },
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'profile',
      title: 'Profil cible',
      type: 'string',
      options: {
        list: [
          { title: 'Dirigeants', value: 'Dirigeants' },
          { title: 'Managers / Métiers', value: 'Managers / Métiers' },
          { title: 'Profils techniques', value: 'Profils techniques' },
          { title: 'Collectivités', value: 'Collectivités' },
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'objective',
      title: 'Objectif',
      type: 'text',
      rows: 2,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Durée',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Lien vers la formation',
      type: 'url',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'provider' },
  },
})
