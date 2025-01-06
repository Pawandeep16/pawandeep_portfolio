"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

const artworks = [
  {
    title: "Digital Abstract",
    description: "A vibrant exploration of color and form in digital space",
    image: "https://pawandeep-portfolio.web.app/Assests/Art/nanak.jpg?w=1920&h=1080&fit=crop",
    category: "Digital Art"
  },
  {
    title: "Geometric Harmony",
    description: "Intersection of mathematics and visual aesthetics",
    image: "https://pawandeep-portfolio.web.app/Assests/Art/harley.jpg?w=1920&h=1080&fit=crop",
    category: "3D Design"
  },
  {
    title: "Urban Dreams",
    description: "Contemporary interpretation of city landscapes",
    image: "https://pawandeep-portfolio.web.app/Assests/Art/gta_p.png?w=1920&h=1080&fit=crop",
    category: "Illustration"
  },
  {
    title: "Nature's Patterns",
    description: "Organic forms translated into digital artwork",
    image: "https://pawandeep-portfolio.web.app/Assests/Art/mmyg.jpg?w=1920&h=1080&fit=crop",
    category: "Mixed Media"
  }
]

export function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? artworks.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === artworks.length - 1 ? 0 : prev + 1))
  }

  return (
    <section id="gallery" className="min-h-screen relative bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <Image
            src={artworks[currentIndex].image}
            alt={artworks[currentIndex].title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-3xl"
            >
              <span className="text-sm font-medium text-white/80 mb-2 block">
                {artworks[currentIndex].category}
              </span>
              <h2 className="text-5xl font-bold text-white mb-4">
                {artworks[currentIndex].title}
              </h2>
              <p className="text-xl text-white/80">
                {artworks[currentIndex].description}
              </p>
            </motion.div>
          </div>
        </div>

        <div className="pb-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrevious}
                className="group flex items-center text-white/60 hover:text-white transition-colors"
              >
                <ChevronLeft className="w-6 h-6 mr-2 transition-transform group-hover:-translate-x-1" />
                Previous
              </button>

              <div className="flex gap-1">
                {artworks.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className="group p-2"
                  >
                    <div
                      className={`w-12 h-1 rounded-sm transition-all ${
                        index === currentIndex 
                          ? "bg-white" 
                          : "bg-white/30 group-hover:bg-white/50"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <button
                onClick={handleNext}
                className="group flex items-center text-white/60 hover:text-white transition-colors"
              >
                Next
                <ChevronRight className="w-6 h-6 ml-2 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}