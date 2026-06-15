import { defineType, defineField } from 'sanity'

export const platformSchema = defineType({
  name: 'platform',
  title: 'Plateformes recommandées',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom de la plateforme',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type (ex: MOOC gratuit, Parcours certifiants…)',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'topics',
      title: 'Thématiques couvertes',
      type: 'text',
      rows: 2,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'free',
      title: 'Gratuit ?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
      initialValue: 99,
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'type' },
  },
})
