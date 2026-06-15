import { defineType, defineField } from 'sanity'

export const aideSchema = defineType({
  name: 'aide',
  title: 'Aides & financements',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom de l\'aide',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'org',
      title: 'Organisme',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Nationale', value: 'national' },
          { title: 'Régionale', value: 'regional' },
          { title: 'Fiscale', value: 'fiscal' },
          { title: 'Formation', value: 'formation' },
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Catégorie (ex: Subvention, Prêt…)',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'amount',
      title: 'Montant / Avantage',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'eligibility',
      title: 'Éligibilité',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Lien officiel',
      type: 'url',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
      initialValue: 99,
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'org' },
  },
})
