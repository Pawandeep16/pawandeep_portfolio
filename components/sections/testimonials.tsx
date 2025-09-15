"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Quote, Star } from "lucide-react"
import { useRef, useEffect, useState } from "react"
import { client, TESTIMONIALS_QUERY, urlFor } from '@/lib/sanity'
import { Testimonial } from '@/lib/types'

export function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await client.fetch(TESTIMONIALS_QUERY)
        setTestimonials(data)
      } catch (error) {
        console.error('Error fetching testimonials:', error)
        setTestimonials([
          {
            _id: '1',
            name: "Sarah Johnson",
            role: "CEO",
            company: "TechStart Inc.",
            content: "Working with Pawandeep was an absolute pleasure. Their attention to detail and creative solutions helped transform our vision into reality. The project exceeded all our expectations.",
            rating: 5,
            image: null,
            order: 1
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  if (loading) {
    return (
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-pink-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-pink-950/30" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse mb-6 max-w-md mx-auto" />
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse max-w-2xl mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-80 bg-gray-200 dark:bg-gray-700 rounded-3xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={containerRef} className="py-20 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-pink-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-pink-950/30" />

      <motion.div className="absolute inset-0 opacity-20" style={{ y }}>
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-pink-400/30 to-purple-600/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-pink-600/30 rounded-full blur-3xl" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
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
            What people say about working with me and the results we&apos;ve achieved together
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial._id}
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

                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-pink-500/20">
                    {testimonial.image ? (
                      <Image
                        src={urlFor(testimonial.image).url()}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-pink-200 to-purple-300 dark:from-pink-700 dark:to-purple-800 flex items-center justify-center">
                        <span className="text-white font-bold text-xl">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">{testimonial.name}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{testimonial.role}</p>
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

export default Testimonials
