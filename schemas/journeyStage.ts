import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'journeyStage',
  title: 'Journey Stage',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Stage title',
      type: 'string',
      description: 'Short — max 3 words (e.g. "Check-in").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'line',
      title: 'One-line description',
      type: 'text',
      description: 'One short line — max 10 words (e.g. "Driver authenticates, route validated, inside 300 m geofence.").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status pill',
      type: 'string',
      description: 'Short uppercase status (e.g. "CHECKED IN").',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'status' },
  },
})
