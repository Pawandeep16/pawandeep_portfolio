"use client"

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Award, ChevronLeft, ChevronRight, X, ExternalLink } from "lucide-react"
import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { client, CERTIFICATIONS_QUERY, urlFor } from "@/lib/sanity"
import { Certification } from "@/lib/types"

export function Certifications() {
  const [certificates, setCertificates] = useState<Certification[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [direction, setDirection] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // only animate small blobs, not whole container
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const minSwipeDistance = 50

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const data = await client.fetch(CERTIFICATIONS_QUERY)
        setCertificates(data)
      } catch (error) {
        console.error("Error fetching certifications:", error)
        setCertificates([
          {
            _id: "1",
            title: "AWS Certified Solutions Architect",
            issuer: "Amazon Web Services",
            date: "2023",
            description:
              "Expertise in designing distributed systems and deploying applications on AWS infrastructure with focus on scalability, security, and cost optimization.",
            image: null,
            badgeColor: "bg-[#FF9900]/10 text-[#FF9900]",
            gradient: "from-orange-500 to-yellow-500",
            skills: ["AWS EC2", "S3", "Lambda", "CloudFormation", "VPC", "IAM"],
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchCertifications()
  }, [])

  const handlePrevious = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev === 0 ? certificates.length - 1 : prev - 1))
  }, [certificates.length])

  const handleNext = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev === certificates.length - 1 ? 0 : prev + 1))
  }, [certificates.length])

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    if (distance > minSwipeDistance) handleNext()
    if (distance < -minSwipeDistance) handlePrevious()
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage) {
        if (e.key === "Escape") setSelectedImage(null)
      } else {
        if (e.key === "ArrowLeft") handlePrevious()
        if (e.key === "ArrowRight") handleNext()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedImage, handlePrevious, handleNext])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9,
    }),
  }

  if (loading) {
    return (
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-orange-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-orange-950/30" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse mb-6 max-w-md mx-auto" />
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse max-w-2xl mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-96 bg-gray-200 dark:bg-gray-700 rounded-3xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={containerRef} className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-orange-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-orange-950/30" />

      {/* Floating blobs only */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          style={{ y, willChange: "transform" }}
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-orange-400/30 to-yellow-600/30 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y, willChange: "transform" }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-orange-600/30 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-orange-800 to-slate-900 dark:from-white dark:via-orange-200 dark:to-white bg-clip-text text-transparent mb-6">
            Certifications & Achievements
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Professional certifications that validate my expertise in cloud technologies and development
          </p>
        </motion.div>

        {/* Desktop View */}
        <div className="hidden lg:block">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.15 } },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            {certificates.map((cert) => (
              <motion.div
                key={cert._id}
                variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.5 }}
                className="apple-card group cursor-pointer"
                onClick={() => cert.image && setSelectedImage(urlFor(cert.image).url())}
              >
                <div className="relative h-48 overflow-hidden rounded-t-3xl">
                  {cert.image ? (
                    <Image
                      src={urlFor(cert.image).url()}
                      alt={cert.title}
                      fill
                      placeholder="blur"
                      blurDataURL="/tiny-placeholder.png"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800" />
                  )}
                  <div className={`absolute inset-0 bg-gradient-to-t ${cert.gradient} opacity-20`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${cert.badgeColor} backdrop-blur-sm`}>
                      {cert.issuer}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-xl bg-gradient-to-r ${cert.gradient} text-white`}>
                      <Award className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{cert.title}</h3>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 leading-relaxed line-clamp-3">
                    {cert.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {cert.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    {cert.skills.length > 3 && (
                      <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs rounded-full">
                        +{cert.skills.length - 3}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-slate-500 dark:text-slate-400">Issued: {cert.date}</div>
                    {cert.credentialUrl && (
                      <Button size="sm" variant="outline" asChild>
                        <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          View
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mobile View - Swipeable */}
        <div className="lg:hidden relative max-w-sm mx-auto">
          <div className="absolute inset-y-0 -left-12 flex items-center z-10">
            <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full glass hover:scale-110" onClick={handlePrevious}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </div>
          <div className="absolute inset-y-0 -right-12 flex items-center z-10">
            <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full glass hover:scale-110" onClick={handleNext}>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          <div className="relative h-[500px] overflow-hidden rounded-3xl" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 250, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.3 },
                }}
                className="absolute inset-0"
              >
                <div
                  className="apple-card h-full cursor-pointer"
                  onClick={() =>
                    certificates[currentIndex]?.image && setSelectedImage(urlFor(certificates[currentIndex].image).url())
                  }
                >
                  <div className="relative h-56 overflow-hidden rounded-t-3xl">
                    {certificates[currentIndex]?.image ? (
                      <Image
                        src={urlFor(certificates[currentIndex].image).url()}
                        alt={certificates[currentIndex].title}
                        fill
                        className="object-cover"
                        placeholder="blur"
                        blurDataURL="/tiny-placeholder.png"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800" />
                    )}
                    <div className={`absolute inset-0 bg-gradient-to-t ${certificates[currentIndex]?.gradient} opacity-20`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${certificates[currentIndex]?.badgeColor} backdrop-blur-sm`}
                      >
                        {certificates[currentIndex]?.issuer}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2 rounded-xl bg-gradient-to-r ${certificates[currentIndex]?.gradient} text-white`}>
                        <Award className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{certificates[currentIndex]?.title}</h3>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">{certificates[currentIndex]?.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {certificates[currentIndex]?.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-slate-500 dark:text-slate-400">Issued: {certificates[currentIndex]?.date}</div>
                      {certificates[currentIndex]?.credentialUrl && (
                        <Button size="sm" variant="outline" asChild>
                          <a href={certificates[currentIndex].credentialUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            View
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Swipe Indicators */}
          <div className="swipe-indicator">
            {certificates.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                }}
                className={`swipe-dot ${index === currentIndex ? "active" : ""}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full glass rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="relative aspect-video">
                <Image src={selectedImage} alt="Certificate" fill className="object-contain" loading="eager" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
