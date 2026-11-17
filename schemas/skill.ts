import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Skill Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'level',
      title: 'Proficiency Level',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5),
      description: 'Rate from 1 to 5 (5 being expert level)',
    }),
  ],
})