"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Award, X, ZoomIn } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import { ScrollArea } from "@/components/ui/scroll-area"

const certificates = [
  {
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2023",
    description: "Expertise in designing distributed systems and deploying applications on AWS infrastructure.",
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&h=600&fit=crop",
    badgeColor: "bg-[#FF9900]/10 text-[#FF9900]"
  },
  // ... other certificates
]

export function Certifications() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <section id="certifications" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Certifications</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional certifications and achievements in technology and development.
          </p>
        </motion.div>

        <ScrollArea className="h-[600px] rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group relative"
              >
                <div className="bg-card rounded-lg overflow-hidden shadow-lg border border-border/50 transition-transform duration-300 hover:scale-[1.02]">
                  <div 
                    className="relative h-48 cursor-pointer overflow-hidden"
                    onClick={() => setSelectedImage(cert.image)}
                  >
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                      <ZoomIn className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className={`inline-block px-2 py-1 rounded-md text-sm ${cert.badgeColor} mb-2`}>
                        {cert.issuer}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Award className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold">{cert.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{cert.description}</p>
                    <div className="mt-4 text-sm text-muted-foreground">
                      Issued: {cert.date}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollArea>

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative max-w-4xl w-full mx-4"
                onClick={e => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-12 right-0 text-foreground hover:text-primary transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src={selectedImage}
                    alt="Certificate"
                    fill
                    className="object-contain"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}