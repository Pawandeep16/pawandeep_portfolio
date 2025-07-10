import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// GROQ Queries
export const HERO_QUERY = `*[_type == "hero"][0]{
  name,
  title,
  roles,
  description,
  location,
  phone,
  email,
  backgroundImage,
  profileImage
}`

export const SKILLS_QUERY = `*[_type == "skillCategory"] | order(order asc){
  _id,
  title,
  icon,
  color,
  bgColor,
  skills[]->{
    name,
    level
  }
}`

export const EDUCATION_QUERY = `*[_type == "education"] | order(endDate desc){
  _id,
  degree,
  field,
  institution,
  location,
  startDate,
  endDate,
  current,
  description,
  achievements,
  gpa
}`

export const EXPERIENCE_QUERY = `*[_type == "experience"] | order(endDate desc){
  _id,
  title,
  company,
  location,
  startDate,
  endDate,
  current,
  description,
  achievements,
  technologies
}`

export const PROJECTS_QUERY = `*[_type == "project"] | order(order asc){
  _id,
  title,
  description,
  image,
  tags,
  liveUrl,
  githubUrl,
  gradient,
  featured
}`

export const CERTIFICATIONS_QUERY = `*[_type == "certification"] | order(date desc){
  _id,
  title,
  issuer,
  date,
  description,
  image,
  badgeColor,
  gradient,
  skills,
  credentialUrl
}`

export const GALLERY_QUERY = `*[_type == "artwork"] | order(order asc){
  _id,
  title,
  description,
  image,
  category,
  tags,
  year,
  client,
  tools,
  featured
}`

export const TESTIMONIALS_QUERY = `*[_type == "testimonial"] | order(order asc){
  _id,
  name,
  role,
  company,
  content,
  rating,
  image
}`

export const SOCIAL_LINKS_QUERY = `*[_type == "socialLink"] | order(order asc){
  _id,
  name,
  url,
  icon,
  color,
  bgColor
}`