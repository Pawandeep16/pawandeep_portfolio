export interface Hero {
  name: string
  title: string
  roles: string[]
  description: string
  location: string
  phone?: string
  email: string
  backgroundImage?: any
  profileImage?: any
}

export interface Skill {
  name: string
  level: number
}

export interface SkillCategory {
  _id: string
  title: string
  icon: string
  color: string
  bgColor: string
  skills: Skill[]
  order: number
}

export interface Education {
  _id: string
  degree: string
  field: string
  institution: string
  location: string
  startDate: string
  endDate?: string
  current: boolean
  description: string
  achievements?: string[]
  gpa?: string
}

export interface Experience {
  _id: string
  title: string
  company: string
  location: string
  startDate: string
  endDate?: string
  current: boolean
  description: string
  achievements?: string[]
  technologies?: string[]
}

export interface JourneyStage {
  title: string
  line: string
  status: string
}

export interface Project {
  _id: string
  title: string
  description: string
  image: any
  tags: string[]
  liveUrl?: string
  githubUrl?: string
  gradient: string
  featured: boolean
  order: number
  category?: "logistics" | "software" | "design" | string
  internal?: boolean
  problem?: string | null
  solution?: string | null
  features?: string[]
  contribution?: string | null
  challenges?: string[]
  journey?: JourneyStage[] | null
}

export interface Certification {
  _id: string
  title: string
  issuer: string
  date: string
  description: string
  image: any
  badgeColor: string
  gradient: string
  skills: string[]
  credentialUrl?: string
}

export interface Artwork {
  _id: string
  title: string
  description?: string
  image: any
  /** Original asset dimensions (px), from Sanity metadata.dimensions —
   *  the frame is sized to the image's real aspect ratio. Also present
   *  in the fallback snapshot; when missing, the aspect is parsed from
   *  the image asset ref (`image-<hash>-<W>x<H>-<fmt>`), else 4:5. */
  imageWidth?: number
  imageHeight?: number
  category: string[]
  tags?: string[]
  year: string
  client?: string
  tools?: string[]
  featured: boolean
  order: number
}

export interface Testimonial {
  _id: string
  name: string
  role: string
  company: string
  content: string
  rating: number
  image: any
  order: number
}

export interface SocialLink {
  _id: string
  name: string
  url: string
  icon: string
  color: string
  bgColor: string
  order: number
}