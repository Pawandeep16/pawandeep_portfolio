"use client"

import { motion } from "framer-motion"
import { GraduationCap, Calendar, MapPin } from "lucide-react"

const education = [
  {
    degree: "Ontario College Graduate Certificate",
    field: "Computer Software and Database Development",
    institution: "Loyalist College",
    location: "Toronto, ON",
    period: "May 2023 – April 2024",
    current: true
  },
  {
    degree: "Bachelor of Technology",
    field: "Computer Science and Engineering",
    institution: "Guru Nanak Dev Engineering College",
    location: "Ludhiana, Punjab",
    period: "July 2018 – July 2022"
  }
]

export function Education() {
  return (
    <section id="education" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Education</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My academic journey in technology and software development.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {education.map((edu, index) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative pl-8 pb-12 last:pb-0"
            >
              {/* Timeline line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-primary/20" />
              
              {/* Timeline dot */}
              <div className="absolute left-[-4px] top-0 w-2 h-2 rounded-full bg-primary" />

              <div className="bg-card rounded-lg p-6 shadow-lg border border-border/50">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-primary mb-1">
                      <GraduationCap className="w-5 h-5" />
                      <h3 className="font-semibold">{edu.degree}</h3>
                    </div>
                    <p className="text-lg font-medium mb-2">{edu.field}</p>
                    <div className="flex flex-wrap gap-4 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{edu.institution}, {edu.location}</span>
                      </div>
                      <div className="flex items-center justify-end  right-0 gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{edu.period}</span>
                      </div>
                    </div>
                  </div>
                  {edu.current && (
                    <span className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full">
                      Recently
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}