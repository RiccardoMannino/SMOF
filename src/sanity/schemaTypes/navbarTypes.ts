import {defineArrayMember, defineField, defineType} from 'sanity'

export const navbar = defineType({
  type: 'object',
  name: 'Navbar',
  title: 'Navbar',
  fields: [
    defineField({type: 'image', name: 'navbarLogo', title: 'Navbar Logo'}),
    defineField({
      type: 'array',
      name: 'navbarLinks',
      title: 'Navbar Links',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'Menu',
          fields: [
            {
              type: 'url',
              name: 'voce',
            },
          ],
        }),
      ],
    }),
    defineField({type: 'string', name: 'navbarCta', title: 'Navbar CTA'}),
  ],
})
