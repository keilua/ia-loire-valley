import { defineType, defineField } from 'sanity'

export const newsArticleSchema = defineType({
  name: 'newsArticle',
  title: 'Actualités',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'IA générative', value: 'IA générative' },
          { title: 'Industrie', value: 'Industrie' },
          { title: 'Réglementation', value: 'Réglementation' },
          { title: 'Outils', value: 'Outils' },
          { title: 'Territoire', value: 'Territoire' },
          { title: 'Innovation', value: 'Innovation' },
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date de publication',
      type: 'date',
      options: { dateFormat: 'DD/MM/YYYY' },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Résumé',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'readTime',
      title: 'Temps de lecture (minutes)',
      type: 'number',
      validation: Rule => Rule.required().min(1).max(60),
    }),
    defineField({
      name: 'isHero',
      title: 'Article à la une ?',
      type: 'boolean',
      description: 'Afficher cet article en tête de la page Actualités',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'image' },
  },
})
