"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Briefcase, Calendar, MapPin, Award } from "lucide-react"
import { useRef } from "react"

const experience = [
  {
    title: "IT Operations & Inventory Systems Specialist",
    company: "GoBolt Logistics",
    location: "Markham, Ontario",
    period: "January 2025 – Present",
    current: true,
    description: "Specialized in IT operations and inventory management systems. Streamlined processes and implemented digital solutions to improve operational efficiency..",
    achievements: ["Optimized inventory tracking system", "Reduced manual processes by 60%", "Enhanced data accuracy and reporting"]
  },
  {
    title: "Full Stack Developer",
    company: "Obsidian Glass Industry",
    location: "Mississauga, Ontario",
    period: "January 2025 – May 2025",
    description: "Developing and maintaining full-stack applications for logistics and supply chain management. Working with modern technologies to optimize delivery operations and enhance user experience.",
    achievements: ["Led development of real-time tracking system", "Improved application performance by 40%", "Implemented automated testing pipeline"]
  }
]

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section ref={containerRef} className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-purple-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-purple-950/30" />
      
      {/* Floating Elements */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{ y }}
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-400/30 to-blue-600/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-purple-600/30 rounded-full blur-3xl" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-purple-800 to-slate-900 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent mb-6">
            Work Experience
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            My professional journey in technology and software development
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {experience.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative mb-16 last:mb-0"
            >
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 to-blue-500 opacity-30" />
              
              {/* Timeline dot */}
              <motion.div 
                className="absolute left-6 top-8 w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg"
                whileHover={{ scale: 1.5 }}
                transition={{ duration: 0.2 }}
              />

              <div className="ml-20">
                <motion.div 
                  className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl border border-white/20 dark:border-slate-700/20 transition-all duration-500"
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 text-purple-600 dark:text-purple-400 mb-2">
                        <Briefcase className="w-6 h-6" />
                        <h3 className="font-bold text-xl">{exp.title}</h3>
                      </div>
                      <p className="text-2xl font-semibold text-slate-900 dark:text-white mb-3">
                        {exp.company}
                      </p>
                      <div className="flex flex-wrap gap-6 text-slate-600 dark:text-slate-300 mb-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{exp.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{exp.period}</span>
                        </div>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                        {exp.description}
                      </p>
                      
                      {/* Achievements */}
                      <div className="flex items-center gap-2 mb-4">
                        <Award className="w-5 h-5 text-yellow-500" />
                        <span className="font-semibold text-slate-900 dark:text-white">Key Achievements:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {exp.achievements.map((achievement, achIndex) => (
                          <motion.span
                            key={achievement}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: achIndex * 0.1 }}
                            className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm rounded-full border border-purple-200 dark:border-purple-700"
                          >
                            {achievement}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                    {exp.current && (
                      <motion.span 
                        className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm px-4 py-2 rounded-full shadow-lg"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        Current
                      </motion.span>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}