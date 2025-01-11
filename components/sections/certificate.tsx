"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Award, ChevronLeft, ChevronRight, X } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const certificates = [
  {
    title: "Advanced Web Development",
    issuer: "Guru Nanak Dev Engineering College",
    date: "2021",
    description: "Developed advanced skills in designing and building dynamic web applications, focusing on both frontend and backend systems. Gained proficiency in deploying applications on various platforms for optimal performance.",
    image: "https://res.cloudinary.com/dpjsyk9yu/image/upload/v1736625382/guru_nanak_dev_engineering_technology_certificate_full_stack_mvq8yu.webp",
    badgeColor: "bg-[#FF9900]/10 text-[#FF9900]"
  },
  {
    title: "Android App Development",
    issuer: "Internshala",
    date: "2021",
    description: "Completed a comprehensive course in Android App Development, demonstrating expertise in building user-friendly and efficient Android applications. Proficient in Java and Kotlin, with experience in deploying apps to the Google Play Store.",
    image: "https://res.cloudinary.com/dpjsyk9yu/image/upload/v1736625382/Android_app_Developemnt_tfhy1h.webp",
    badgeColor: "bg-[#4285F4]/10 text-[#4285F4]"
  },
  {
    title: "Java Development Training",
    issuer: "IIT Bombay",
    date: "2021",
    description: "Gained in-depth knowledge of Java programming and object-oriented design principles. Focused on developing efficient Java applications, with experience in working with Java-based frameworks and libraries.",
    image: "https://res.cloudinary.com/dpjsyk9yu/image/upload/v1736625824/java_u2ssxm.webp",
    badgeColor: "bg-[#00A4EF]/10 text-[#00A4EF]"
  },
  {
    title: "Latex Training",
    issuer: "IIT Bombay",
    date: "2021",
    description: "Acquired specialized skills in LaTeX, a typesetting system widely used for technical and scientific documents. Mastered advanced formatting techniques to create professional-looking research papers, articles, and presentations.",
    image: "https://res.cloudinary.com/dpjsyk9yu/image/upload/v1736625958/latex_yhm6wz.webp",
    badgeColor: "bg-[#00A4EF]/10 text-[#00A4EF]"
  }
]

export function Certifications() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [direction, setDirection] = useState(0)

  const handlePrevious = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev === 0 ? certificates.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev === certificates.length - 1 ? 0 : prev + 1))
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage) {
        if (e.key === 'Escape') setSelectedImage(null)
      } else {
        if (e.key === 'ArrowLeft') handlePrevious()
        if (e.key === 'ArrowRight') handleNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  }

  return (
    <section className="py-20 overflow-hidden">
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

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute inset-y-0 -left-20 flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-background/80 hover:text-primary transition-colors"
              onClick={handlePrevious}
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>
          </div>

          <div className="absolute inset-y-0 -right-20 flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-background/80 hover:text-primary transition-colors"
              onClick={handleNext}
            >
              <ChevronRight className="w-8 h-8" />
            </Button>
          </div>

          <div className="relative h-[500px] overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.4 }
                }}
                className="absolute inset-0"
              >
                <div className="bg-card rounded-lg overflow-hidden shadow-lg border border-border/50 h-full">
                  <div 
                    className="relative h-64 cursor-pointer"
                    onClick={() => setSelectedImage(certificates[currentIndex].image)}
                  >
                    <Image
                      src={certificates[currentIndex].image}
                      alt={certificates[currentIndex].title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className={`inline-block px-2 py-1 rounded-md text-sm ${certificates[currentIndex].badgeColor}`}>
                        {certificates[currentIndex].issuer}
                      </span>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Award className="w-6 h-6 text-primary" />
                      <h3 className="text-xl font-semibold">{certificates[currentIndex].title}</h3>
                    </div>
                    <p className="text-muted-foreground text-lg mb-6">{certificates[currentIndex].description}</p>
                    <div className="text-sm text-muted-foreground">
                      Issued: {certificates[currentIndex].date}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-8 gap-2">
            {certificates.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                }}
                className="p-1"
              >
                <div
                  className={`w-8 h-2 rounded-full transition-colors ${
                    index === currentIndex
                      ? "bg-primary"
                      : "bg-primary/20"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

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
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={selectedImage}
                  alt="Certificate"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}