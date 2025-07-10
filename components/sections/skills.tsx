"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Code, Brush, Layout, Zap, Database, Globe } from "lucide-react"
import { useRef } from "react"

const skills = [
  {
    icon: <Code className="w-8 h-8" />,
    title: "Frontend Development",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vue.js"],
    color: "from-blue-500 to-cyan-500",
    bgColor: "from-blue-500/10 to-cyan-500/10"
  },
  {
    icon: <Database className="w-8 h-8" />,
    title: "Backend Development",
    items: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Express", "FastAPI"],
    color: "from-green-500 to-emerald-500",
    bgColor: "from-green-500/10 to-emerald-500/10"
  },
  {
    icon: <Brush className="w-8 h-8" />,
    title: "Design & Graphics",
    items: ["Figma", "Adobe XD", "Illustrator", "Photoshop", "UI/UX Design", "Branding"],
    color: "from-purple-500 to-pink-500",
    bgColor: "from-purple-500/10 to-pink-500/10"
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Web Technologies",
    items: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "PWA", "SEO"],
    color: "from-orange-500 to-red-500",
    bgColor: "from-orange-500/10 to-red-500/10"
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Tools & Platforms",
    items: ["Git", "Docker", "AWS", "Vercel", "Figma", "VS Code"],
    color: "from-yellow-500 to-orange-500",
    bgColor: "from-yellow-500/10 to-orange-500/10"
  },
  {
    icon: <Layout className="w-8 h-8" />,
    title: "Soft Skills",
    items: ["Problem Solving", "Team Leadership", "Agile", "Communication", "Creativity", "Time Management"],
    color: "from-indigo-500 to-purple-500",
    bgColor: "from-indigo-500/10 to-purple-500/10"
  }
]

export function Skills() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section ref={containerRef} className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-blue-50/50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-950/50" />
      
      {/* Floating Elements */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{ y }}
      >
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-r from-purple-400/30 to-pink-600/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-cyan-600/30 rounded-full blur-3xl" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 dark:from-white dark:via-blue-200 dark:to-white bg-clip-text text-transparent mb-6">
            Skills & Expertise
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            A comprehensive overview of my technical skills and creative abilities
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${skill.bgColor} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm p-8 rounded-2xl border border-white/20 dark:border-slate-700/20 shadow-lg hover:shadow-2xl transition-all duration-500">
                <div className={`flex items-center justify-center mb-6 w-16 h-16 rounded-2xl bg-gradient-to-r ${skill.color} text-white mx-auto shadow-lg`}>
                  {skill.icon}
                </div>
                <h3 className="text-xl font-bold text-center mb-6 text-slate-900 dark:text-white">
                  {skill.title}
                </h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {skill.items.map((item, itemIndex) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: (index * 0.1) + (itemIndex * 0.05) }}
                      className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm rounded-full border border-slate-200 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}