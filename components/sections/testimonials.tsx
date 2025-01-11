"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sukhjit Singh Ahluwalia",
    role: "Professor Glasgow Caledonian University",
    image: "https://media.licdn.com/dms/image/v2/D4E03AQEX4mh9Ial9sQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1686785193097?e=1741824000&v=beta&t=C9xCyAIJ6sI6EmRmJQx_jAqI3Osjp3W3tDJXKmRBDww",
    content: "Working with Pawandeep was an absolute pleasure. Their attention to detail and creative solutions helped transform our vision into reality."
  },
  {
    name: "Manjodh Singh Saran",
    role: "SDE @CBC - MERN",
    image: "https://media.licdn.com/dms/image/v2/D5603AQFg-_CP-veeNw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1722969008247?e=1741824000&v=beta&t=-_Lma5l-XSYhHbo6XXhnCecx_4nF8LFZuvrqM2gk15s",
    content: "Exceptional design skills and a great eye for aesthetics. Pawandeep consistently delivered beyond our expectations."
  },
  {
    name: "Pooja Rani",
    role: "Executive @ Honda",
    image: "https://media.licdn.com/dms/image/v2/D5603AQFddq4EZ_F41w/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1729438741113?e=1741824000&v=beta&t=h20ibpn3Eewjc4F9yoHbyxLxHrrf_JxYf1-tYplA9jM",
    content: "A talented developer who brings both technical expertise and creative flair to every project. It was a joy collaborating with them."
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
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-muted-foreground">{testimonial.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}