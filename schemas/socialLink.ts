import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'socialLink',
  title: 'Social Link',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Platform Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Profile URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name (Lucide React)',
      type: 'string',
      description: 'Enter the Lucide React icon name (e.g., "Github", "Linkedin", "Instagram")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'color',
      title: 'Hover Color Classes',
      type: 'string',
      description: 'Tailwind hover color classes (e.g., "hover:text-[#0077B5]")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bgColor',
      title: 'Background Color Classes',
      type: 'string',
      description: 'Tailwind background color classes (e.g., "hover:bg-[#0077B5]/10")',
      validation: (Rule) => Rule.required(),
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