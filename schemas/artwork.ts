import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'artwork',
  title: 'Artwork',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Artwork Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Artwork Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categories',  // plural for clarity
      title: 'Categories',
      type: 'array',
      of: [
        defineField({
          type: 'string',
          options: {
            list: [
              { title: 'Digital Art', value: 'digital-art' },
              { title: 'Photography', value: 'photography' },
              { title: 'Illustration', value: 'illustration' },
              { title: 'UI/UX Design', value: 'ui-ux' },
              { title: 'Branding', value: 'branding' },
              { title: 'Web Design', value: 'web-design' },
              { title: 'Print Design', value: 'print-design' },
              { title: 'Motion Graphics', value: 'motion-graphics' },
            ],
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [
        defineField({
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'year',
      title: 'Year Created',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
    }),
    defineField({
      name: 'tools',
      title: 'Tools Used',
      type: 'array',
      of: [
        defineField({
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Artwork',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
