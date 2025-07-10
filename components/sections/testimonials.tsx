// "use client"

// import { motion } from "framer-motion"
// import Image from "next/image"
// import { Quote, Linkedin } from "lucide-react"



// export function Testimonials() {
//   return (
//     <section id="testimonials" className="py-20">
//       <div className="container mx-auto px-4">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center mb-12"
//         >
//           <h2 className="text-3xl font-bold mb-4">Client Testimonials</h2>
//           <p className="text-muted-foreground max-w-2xl mx-auto">
//             What people say about working with me.
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {testimonials.map((testimonial, index) => (
//             <motion.div
//               key={testimonial.name}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: index * 0.2 }}
//               className="bg-card p-6 rounded-lg shadow-lg relative"
//             >
//               <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/20" />
//               <div className="flex items-center gap-4 mb-4">
//                 <div className="relative w-12 h-12 rounded-full overflow-hidden">
//                   <Image
//                     src={testimonial.image}
//                     alt={testimonial.name}
//                     fill
//                     className="object-cover"
//                   />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold">{testimonial.name}  {testimonial.linkedin && (
//                 <a
//                   href={testimonial.linkedin}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className=" ml-3 inline-flex items-center gap-2 text-blue-600 hover:underline text-sm font-medium"
//                 >
//                   <Linkedin className="w-4 h-4" />
                 
//                 </a>
//               )}</h3>
//                   <p className="text-sm text-muted-foreground">{testimonial.role}</p>
//                 </div>
//               </div>
//               <p className="text-muted-foreground mb-4">{testimonial.content}</p>
            
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }


"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Quote, Star } from "lucide-react"
import { useRef } from "react"

const testimonials = [
  {
    name: "Sukhjit Singh Ahluwalia",
    role: "Professor Glasgow Caledonian University",
    image: "https://res.cloudinary.com/dpjsyk9yu/image/upload/v1748397217/Testomonials/gxvktgcfk3zd5zkjv5bo.jpg",
    content: "Working with Pawandeep was an absolute pleasure. Their attention to detail and creative solutions helped transform our vision into reality.",
    linkedin: "https://www.linkedin.com/in/sukhforchange/"
  },
  {
    name: "Manjodh Singh Saran",
    role: "SDE @CBC - MERN",
    image: "https://res.cloudinary.com/dpjsyk9yu/image/upload/v1748397217/Testomonials/d7kk9dytffu3tz78mrt8.jpg",
    content: "Exceptional design skills and a great eye for aesthetics. Pawandeep consistently delivered beyond our expectations.",
    linkedin: "https://www.linkedin.com/in/manjodh-saran/"
  },
  {
    name: "Pooja Rani",
    role: "Executive @ Honda",
    image: "https://res.cloudinary.com/dpjsyk9yu/image/upload/v1748397217/Testomonials/m788edggvywqdbxvfhfu.jpg",
    content: "A talented developer who brings both technical expertise and creative flair to every project. It was a joy collaborating with them.",
    linkedin: "https://www.linkedin.com/in/pooja-rani-1810/"
  }
]

export function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section ref={containerRef} className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-pink-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-pink-950/30" />
      
      {/* Floating Elements */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{ y }}
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-pink-400/30 to-purple-600/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-pink-600/30 rounded-full blur-3xl" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-pink-800 to-slate-900 dark:from-white dark:via-pink-200 dark:to-white bg-clip-text text-transparent mb-6">
            Client Testimonials
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            What people say about working with me and the results we've achieved together
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl border border-white/20 dark:border-slate-700/20 transition-all duration-500">
                <Quote className="absolute top-6 right-6 w-8 h-8 text-pink-500/30" />
                
                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-pink-500/20">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {testimonial.role}
                    </p>
                    <p className="text-xs text-pink-600 dark:text-pink-400 font-medium">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}