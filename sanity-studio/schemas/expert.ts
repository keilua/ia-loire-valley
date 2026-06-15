import { defineType, defineField } from 'sanity'
import { AddressInput } from '../components/AddressInput'

export const expertSchema = defineType({
  name: 'expert',
  title: 'Experts',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom complet',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo de l\'organisation',
      type: 'image',
      options: { hotspot: true },
      description: 'Logo de l\'entreprise — glissez-déposez ou importez une image',
    }),
    defineField({
      name: 'specialty',
      title: 'Spécialité',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Ville',
      type: 'string',
      options: {
        list: ['Orléans', 'Tours', 'Blois', 'Châteauroux', 'Bourges', 'Chartres', 'Autre'],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'level',
      title: 'Type d\'intervention',
      type: 'string',
      options: {
        list: [
          { title: 'Conseil', value: 'Conseil' },
          { title: 'Accompagnement', value: 'Accompagnement' },
          { title: 'Formation', value: 'Formation' },
          { title: 'Développement', value: 'Développement' },
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Adresse complète',
      type: 'string',
      description: 'Ex: 1 rue de la Paix, 45000 Orléans',
      components: { input: AddressInput },
    }),
    defineField({
      name: 'lat',
      title: 'Latitude (GPS)',
      type: 'number',
      description: 'Rempli automatiquement par le bouton "Géocoder l\'adresse"',
      readOnly: true,
    }),
    defineField({
      name: 'lng',
      title: 'Longitude (GPS)',
      type: 'number',
      description: 'Rempli automatiquement par le bouton "Géocoder l\'adresse"',
      readOnly: true,
    }),
    defineField({
      name: 'sectors',
      title: 'Secteurs',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: ['Industrie', 'Santé', 'Finance', 'Retail', 'RH', 'Formation', 'Collectivités', 'BTP', 'Énergie', 'Tech', 'Communication', 'Logistique', 'Marketing', 'Services'],
      },
    }),
    defineField({
      name: 'expertise',
      title: 'Domaines d\'expertise',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'website',
      title: 'Site web',
      type: 'url',
    }),
    defineField({
      name: 'email',
      title: 'Email de contact',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Téléphone',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'specialty' },
  },
})
