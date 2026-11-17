import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'skillCategory',
  title: 'Skill Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Category Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name (Lucide React)',
      type: 'string',
      description: 'Enter the Lucide React icon name (e.g., "Code", "Brush", "Database")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'color',
      title: 'Gradient Color Classes',
      type: 'string',
      description: 'Tailwind gradient classes (e.g., "from-blue-500 to-cyan-500")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bgColor',
      title: 'Background Color Classes',
      type: 'string',
      description: 'Tailwind background gradient classes (e.g., "from-blue-500/10 to-cyan-500/10")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'skill' } }],
      validation: (Rule) => Rule.required().min(1),
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