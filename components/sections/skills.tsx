"use client"

import { motion } from "framer-motion"
import { Code, Brush, Layout } from "lucide-react"

const skills = [
  {
    icon: <Code className="w-8 h-8" />,
    title: "Development",
    items: ["React", "Next.js", "Node.js", "TypeScript", "Python", "MongoDB"]
  },
  {
    icon: <Brush className="w-8 h-8" />,
    title: "Design",
    items: ["Figma", "Adobe XD", "Illustrator", "Photoshop", "UI/UX Design"]
  },
  {
    icon: <Layout className="w-8 h-8" />,
    title: "Other Skills",
    items: ["SEO", "Responsive Design", "Git", "Agile", "Team Leadership"]
  }
]

export function Skills() {
  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Skills & Expertise</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and areas of expertise.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-card p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-center justify-center mb-4 text-primary">
                {skill.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">{skill.title}</h3>
              <ul className="space-y-2">
                {skill.items.map((item) => (
                  <li key={item} className="text-center text-muted-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}