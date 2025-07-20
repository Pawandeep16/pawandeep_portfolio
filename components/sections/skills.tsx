"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Code, Brush, Layout, Zap, Database, Globe,Award} from "lucide-react"
import { useRef, useEffect, useState } from "react"
import { client, SKILLS_QUERY } from '@/lib/sanity'
import { SkillCategory } from '@/lib/types'

const iconMap: { [key: string]: any } = {
  Code,
  Brush,
  Layout,
  Zap,
  Database,
  Globe,
  Award
}

export function Skills() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([])
  const [loading, setLoading] = useState(true)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await client.fetch(SKILLS_QUERY)
        setSkillCategories(data)
      } catch (error) {
        console.error('Error fetching skills:', error)
        setSkillCategories([
          {
            _id: '1',
            title: "Frontend Development",
            icon: "Code",
            color: "from-blue-500 to-cyan-500",
            bgColor: "from-blue-500/10 to-cyan-500/10",
            skills: [
              { name: "React", level: 5 },
              { name: "Next.js", level: 5 },
              { name: "TypeScript", level: 4 },
              { name: "Tailwind CSS", level: 5 }
            ],
            order: 1
          },
          {
            _id: '2',
            title: "Backend Development",
            icon: "Database",
            color: "from-green-500 to-emerald-500",
            bgColor: "from-green-500/10 to-emerald-500/10",
            skills: [
              { name: "Node.js", level: 4 },
              { name: "Python", level: 4 },
              { name: "PostgreSQL", level: 4 },
              { name: "MongoDB", level: 4 }
            ],
            order: 2
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchSkills()
  }, [])

  if (loading) {
    return (
      <section className="py-20 md:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-blue-50/50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-950/50" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <div className="h-12 sm:h-16 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse mb-4 sm:mb-6 max-w-sm sm:max-w-md mx-auto" />
            <div className="h-5 sm:h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse max-w-xl sm:max-w-2xl mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 sm:h-80 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={containerRef} className="py-20 md:py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-blue-50/50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-950/50" />
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{ y }}
      >
        <div className="absolute top-20 right-10 w-60 sm:w-72 h-60 sm:h-72 bg-gradient-to-r from-purple-400/30 to-pink-600/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-80 sm:w-96 h-80 sm:h-96 bg-gradient-to-r from-blue-400/30 to-cyan-600/30 rounded-full blur-3xl" />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 dark:from-white dark:via-blue-200 dark:to-white bg-clip-text text-transparent mb-4 sm:mb-6">
            Skills & Expertise
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            A comprehensive overview of my technical skills and creative abilities
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {skillCategories.map((skillCategory, index) => {
            const IconComponent = iconMap[skillCategory.icon] || Code
            return (
              <motion.div
                key={skillCategory._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${skillCategory.bgColor} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/20 dark:border-slate-700/20 shadow-lg hover:shadow-2xl transition-all duration-500">
                  <div className={`flex items-center justify-center mb-4 sm:mb-6 w-14 sm:w-16 h-14 sm:h-16 rounded-2xl bg-gradient-to-r ${skillCategory.color} text-white mx-auto shadow-lg`}>
                    <IconComponent className="w-6 sm:w-8 h-6 sm:h-8" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-center mb-4 sm:mb-6 text-slate-900 dark:text-white">
                    {skillCategory.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {skillCategory.skills.map((skill, itemIndex) => (
                      <motion.span
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: (index * 0.1) + (itemIndex * 0.05) }}
                        className="px-2.5 sm:px-3 py-1 text-xs sm:text-sm bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full border border-slate-200 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200"
                      >
                        {skill.name}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
