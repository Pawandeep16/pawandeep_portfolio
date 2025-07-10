// "use client"

// import { motion } from "framer-motion"
// import { GraduationCap, Calendar, MapPin } from "lucide-react"

// const education = [
//   {
//     degree: "Ontario College Graduate Certificate",
//     field: "Computer Software and Database Development",
//     institution: "Loyalist College",
//     location: "Toronto, ON",
//     period: "May 2023 – April 2024",
//     current: true
//   },
//   {
//     degree: "Bachelor of Technology",
//     field: "Computer Science and Engineering",
//     institution: "Guru Nanak Dev Engineering College",
//     location: "Ludhiana, Punjab",
//     period: "July 2018 – July 2022"
//   }
// ]

// export function Education() {
//   return (
//     <section id="education" className="py-20 bg-muted/30">
//       <div className="container mx-auto px-4">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center mb-12"
//         >
//           <h2 className="text-3xl font-bold mb-4">Education</h2>
//           <p className="text-muted-foreground max-w-2xl mx-auto">
//             My academic journey in technology and software development.
//           </p>
//         </motion.div>

//         <div className="max-w-4xl mx-auto">
//           {education.map((edu, index) => (
//             <motion.div
//               key={edu.degree}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: index * 0.2 }}
//               className="relative pl-8 pb-12 last:pb-0"
//             >
//               {/* Timeline line */}
//               <div className="absolute left-0 top-0 bottom-0 w-px bg-primary/20" />
              
//               {/* Timeline dot */}
//               <div className="absolute left-[-4px] top-0 w-2 h-2 rounded-full bg-primary" />

//               <div className="bg-card rounded-lg p-6 shadow-lg border border-border/50">
//                 <div className="flex items-start justify-between flex-wrap gap-4">
//                   <div>
//                     <div className="flex items-center gap-2 text-primary mb-1">
//                       <GraduationCap className="w-5 h-5" />
//                       <h3 className="font-semibold">{edu.degree}</h3>
//                     </div>
//                     <p className="text-lg font-medium mb-2">{edu.field}</p>
//                     <div className="flex flex-wrap gap-4 text-muted-foreground">
//                       <div className="flex items-center gap-1">
//                         <MapPin className="w-4 h-4" />
//                         <span>{edu.institution}, {edu.location}</span>
//                       </div>
//                       <div className="flex items-center justify-end  right-0 gap-1">
//                         <Calendar className="w-4 h-4" />
//                         <span>{edu.period}</span>
//                       </div>
//                     </div>
//                   </div>
//                   {edu.current && (
//                     <span className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full">
//                       Recently
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { GraduationCap, Calendar, MapPin, Award } from "lucide-react"
import { useRef } from "react"

const education = [
  {
    degree: "Ontario College Graduate Certificate",
    field: "Computer Software and Database Development",
    institution: "Loyalist College",
    location: "Toronto, ON",
    period: "May 2023 – April 2024",
    current: true,
    description: "Advanced studies in full-stack development, database design, and modern software engineering practices.",
    achievements: ["Dean's List", "Outstanding Project Award", "4.0 GPA"]
  },
  {
    degree: "Bachelor of Technology",
    field: "Computer Science and Engineering",
    institution: "Guru Nanak Dev Engineering College",
    location: "Ludhiana, Punjab",
    period: "July 2018 – July 2022",
    description: "Comprehensive education in computer science fundamentals, algorithms, and software development.",
    achievements: ["First Class Honors", "Technical Society President", "Research Publication"]
  }
]

export function Education() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section ref={containerRef} className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-green-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-green-950/30" />
      
      {/* Floating Elements */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{ y }}
      >
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-r from-green-400/30 to-blue-600/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-green-600/30 rounded-full blur-3xl" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-green-800 to-slate-900 dark:from-white dark:via-green-200 dark:to-white bg-clip-text text-transparent mb-6">
            Education Journey
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            My academic foundation in technology and software development
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {education.map((edu, index) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative mb-16 last:mb-0"
            >
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-green-500 to-blue-500 opacity-30" />
              
              {/* Timeline dot */}
              <motion.div 
                className="absolute left-6 top-8 w-4 h-4 rounded-full bg-gradient-to-r from-green-500 to-blue-500 shadow-lg"
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
                      <div className="flex items-center gap-3 text-green-600 dark:text-green-400 mb-2">
                        <GraduationCap className="w-6 h-6" />
                        <h3 className="font-bold text-xl">{edu.degree}</h3>
                      </div>
                      <p className="text-2xl font-semibold text-slate-900 dark:text-white mb-3">
                        {edu.field}
                      </p>
                      <div className="flex flex-wrap gap-6 text-slate-600 dark:text-slate-300 mb-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{edu.institution}, {edu.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{edu.period}</span>
                        </div>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                        {edu.description}
                      </p>
                      
                      {/* Achievements */}
                      <div className="flex items-center gap-2 mb-4">
                        <Award className="w-5 h-5 text-yellow-500" />
                        <span className="font-semibold text-slate-900 dark:text-white">Key Achievements:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {edu.achievements.map((achievement, achIndex) => (
                          <motion.span
                            key={achievement}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: achIndex * 0.1 }}
                            className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm rounded-full border border-green-200 dark:border-green-700"
                          >
                            {achievement}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                    {edu.current && (
                      <motion.span 
                        className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-sm px-4 py-2 rounded-full shadow-lg"
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