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
      name: 'author',
      title: 'Auteur',
      type: 'string',
      description: 'Nom de l\'auteur ou de la source (ex: Équipe IA Loire Valley)',
    }),
    defineField({
      name: 'summary',
      title: 'Résumé (affiché sur la carte)',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Contenu complet de l\'article',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Titre H2', value: 'h2' },
            { title: 'Titre H3', value: 'h3' },
            { title: 'Titre H4', value: 'h4' },
            { title: 'Citation', value: 'blockquote' },
          ],
          lists: [
            { title: 'Liste à puces', value: 'bullet' },
            { title: 'Liste numérotée', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Gras', value: 'strong' },
              { title: 'Italique', value: 'em' },
              { title: 'Souligné', value: 'underline' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Lien',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Ouvrir dans un nouvel onglet',
                    initialValue: true,
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Légende',
            },
          ],
        },
      ],
      description: 'Rédigez le contenu complet de l\'article. Laissez vide si l\'article pointe vers une source externe.',
    }),
    defineField({
      name: 'image',
      title: 'Image principale',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Lien source (article externe)',
      type: 'url',
      description: 'URL de la source originale si l\'article provient d\'un site externe',
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
