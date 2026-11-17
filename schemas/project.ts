import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Project Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Technologies/Tags',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'liveUrl',
      title: 'Live Demo URL',
      type: 'url',
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
    }),
    defineField({
      name: 'gradient',
      title: 'Gradient Classes',
      type: 'string',
      description: 'Tailwind gradient classes (e.g., "from-blue-500 to-purple-600")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Used for the project filters on the homepage.',
      options: {
        list: [
          { title: 'Logistics & Operations', value: 'logistics' },
          { title: 'Software & Data', value: 'software' },
          { title: 'Design', value: 'design' },
        ],
      },
    }),
    defineField({
      name: 'internal',
      title: 'Internal production system',
      type: 'boolean',
      description: 'Tick this for systems with no public demo or public repo (e.g. the Driver Check-in System).',
      initialValue: false,
    }),
    defineField({
      name: 'problem',
      title: 'Problem',
      type: 'text',
      description: 'What problem did this project solve? Leave blank if there is no write-up yet.',
    }),
    defineField({
      name: 'solution',
      title: 'Solution',
      type: 'text',
      description: 'How did you solve it?',
    }),
    defineField({
      name: 'features',
      title: 'Key features',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'contribution',
      title: 'My contribution',
      type: 'text',
      description: 'What did you personally design / build / own on this project?',
    }),
    defineField({
      name: 'challenges',
      title: 'Challenges & technical decisions',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'journey',
      title: 'Journey stages',
      type: 'array',
      description: 'The scroll journey for this project (e.g. Check-in → Loading → Serving → Complete). Each stage has a short title, one short line, and a status pill. Leave empty and the site shows the built-in dispatch journey for the Driver Check-in System, or nothing for other projects.',
      of: [{ type: 'journeyStage' }],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
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