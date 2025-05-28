"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Quote, Linkedin } from "lucide-react"

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
  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Client Testimonials</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            What people say about working with me.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-card p-6 rounded-lg shadow-lg relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/20" />
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{testimonial.name}  {testimonial.linkedin && (
                <a
                  href={testimonial.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" ml-3 inline-flex items-center gap-2 text-blue-600 hover:underline text-sm font-medium"
                >
                  <Linkedin className="w-4 h-4" />
                 
                </a>
              )}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">{testimonial.content}</p>
            
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
