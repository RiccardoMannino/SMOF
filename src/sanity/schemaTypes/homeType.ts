import {defineArrayMember, defineField, defineType} from 'sanity'

export const home = defineType({
  type: 'document',
  name: 'home',
  title: 'Home',
  fields: [
    defineField({
      type: 'text',
      name: 'homeHeroText',
      title: 'Home Hero Text',
      validation: (e) => e.required(),
    }),
    defineField({
      type: 'image',
      name: 'homeHeroImage',
      title: 'Home Immagine Hero',
      validation: (e) => e.required(),
    }),
    defineField({
      type: 'reference',
      name: 'featuredEvent',
      title: 'Featured Event',
      to: [{type: 'eventi'}],
    }),
    defineField({
      type: 'array',
      name: 'upcomingEvents',
      title: 'Upcoming Events',
      validation: (e) => e.required(),
      of: [defineArrayMember({type: 'reference', to: [{type: 'eventi'}]})],
    }),
    defineField({
      type: 'Navbar',
      name: 'navbar',
      title: 'Navbar',
      validation: (e) => e.required(),
    }),
  ],
})
