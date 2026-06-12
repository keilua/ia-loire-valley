import { defineType, defineField } from 'sanity'

export const eventSchema = defineType({
  name: 'event',
  title: 'Agenda',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      options: { dateFormat: 'DD/MM/YYYY' },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'startTime',
      title: 'Heure de début',
      type: 'string',
      placeholder: 'ex: 9h00',
    }),
    defineField({
      name: 'endTime',
      title: 'Heure de fin',
      type: 'string',
      placeholder: 'ex: 11h00',
    }),
    defineField({
      name: 'location',
      title: 'Lieu',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Conférence', value: 'Conférence' },
          { title: 'Atelier', value: 'Atelier' },
          { title: 'Webinaire', value: 'Webinaire' },
          { title: 'Networking', value: 'Networking' },
          { title: 'Café Data', value: 'Café Data' },
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Résumé (affiché sur la carte)',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description complète',
      type: 'text',
      rows: 10,
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'link',
      title: 'Lien d\'inscription',
      type: 'url',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'date', media: 'image' },
  },
})
