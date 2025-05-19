import {defineField, defineType} from 'sanity'

export const speaker = defineType({
  type: 'document',
  name: 'speaker',
  title: 'Speaker',
  fields: [
    defineField({
      type: 'string',
      name: 'speakerName',
      title: 'Nome Ospite',
      validation: (e) => e.required(),
    }),
    defineField({
      type: 'text',
      name: 'speakerBio',
      title: 'Bio Ospite',
      validation: (e) => e.required(),
    }),
    defineField({
      type: 'image',
      name: 'speakerImage',
      title: 'Immagine Ospite',
      validation: (e) => e.required(),
    }),
  ],
})
