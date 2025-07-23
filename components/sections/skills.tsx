"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import * as Icons from "lucide-react"
import { useRef, useEffect, useState } from "react"
import { client, SKILLS_QUERY } from '@/lib/sanity'
import { SkillCategory } from '@/lib/types'

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
        {/* loading UI here */}
      </section>
    )
  }

  return (
    <section ref={containerRef} className="py-20 md:py-24 lg:py-32 relative overflow-hidden">
      {/* background gradients & motion divs omitted for brevity */}

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
            const IconComponent = Icons[skillCategory.icon] || Icons.Code

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
