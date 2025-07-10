// "use client"

// import { motion, AnimatePresence } from "framer-motion"
// import { Award, ChevronLeft, ChevronRight, X } from "lucide-react"
// import { useState, useEffect } from "react"
// import Image from "next/image"
// import { Button } from "@/components/ui/button"

// const certificates = [
//   {
//     title: "Advanced Web Development",
//     issuer: "Guru Nanak Dev Engineering College",
//     date: "2021",
//     description: "Developed advanced skills in designing and building dynamic web applications, focusing on both frontend and backend systems. Gained proficiency in deploying applications on various platforms for optimal performance.",
//     image: "https://res.cloudinary.com/dpjsyk9yu/image/upload/v1736625382/guru_nanak_dev_engineering_technology_certificate_full_stack_mvq8yu.webp",
//     badgeColor: "bg-[#FF9900]/10 text-[#FF9900]"
//   },
//   {
//     title: "Android App Development",
//     issuer: "Internshala",
//     date: "2021",
//     description: "Completed a comprehensive course in Android App Development, demonstrating expertise in building user-friendly and efficient Android applications. Proficient in Java and Kotlin, with experience in deploying apps to the Google Play Store.",
//     image: "https://res.cloudinary.com/dpjsyk9yu/image/upload/v1736625382/Android_app_Developemnt_tfhy1h.webp",
//     badgeColor: "bg-[#4285F4]/10 text-[#4285F4]"
//   },
//   {
//     title: "Java Development Training",
//     issuer: "IIT Bombay",
//     date: "2021",
//     description: "Gained in-depth knowledge of Java programming and object-oriented design principles. Focused on developing efficient Java applications, with experience in working with Java-based frameworks and libraries.",
//     image: "https://res.cloudinary.com/dpjsyk9yu/image/upload/v1736625824/java_u2ssxm.webp",
//     badgeColor: "bg-[#00A4EF]/10 text-[#00A4EF]"
//   },
//   {
//     title: "Latex Training",
//     issuer: "IIT Bombay",
//     date: "2021",
//     description: "Acquired specialized skills in LaTeX, a typesetting system widely used for technical and scientific documents. Mastered advanced formatting techniques to create professional-looking research papers, articles, and presentations.",
//     image: "https://res.cloudinary.com/dpjsyk9yu/image/upload/v1736625958/latex_yhm6wz.webp",
//     badgeColor: "bg-[#00A4EF]/10 text-[#00A4EF]"
//   }
// ]

// export function Certifications() {
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [selectedImage, setSelectedImage] = useState<string | null>(null)
//   const [direction, setDirection] = useState(0)

//   const handlePrevious = () => {
//     setDirection(-1)
//     setCurrentIndex((prev) => (prev === 0 ? certificates.length - 1 : prev - 1))
//   }

//   const handleNext = () => {
//     setDirection(1)
//     setCurrentIndex((prev) => (prev === certificates.length - 1 ? 0 : prev + 1))
//   }

//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (selectedImage) {
//         if (e.key === 'Escape') setSelectedImage(null)
//       } else {
//         if (e.key === 'ArrowLeft') handlePrevious()
//         if (e.key === 'ArrowRight') handleNext()
//       }
//     }

//     window.addEventListener('keydown', handleKeyDown)
//     return () => window.removeEventListener('keydown', handleKeyDown)
//   }, [selectedImage])

//   const slideVariants = {
//     enter: (direction: number) => ({
//       x: direction > 0 ? 1000 : -1000,
//       opacity: 0,
//       scale: 0.8,
//     }),
//     center: {
//       zIndex: 1,
//       x: 0,
//       opacity: 1,
//       scale: 1,
//     },
//     exit: (direction: number) => ({
//       zIndex: 0,
//       x: direction < 0 ? 1000 : -1000,
//       opacity: 0,
//       scale: 0.8,
//     }),
//   }

//   return (
//     <section className="py-20 overflow-hidden">
//       <div className="container mx-auto px-4">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center mb-12"
//         >
//           <h2 className="text-3xl font-bold mb-4">Certifications</h2>
//           <p className="text-muted-foreground max-w-2xl mx-auto">
//             Professional certifications and achievements in technology and development.
//           </p>
//         </motion.div>

//         <div className="relative max-w-3xl mx-auto">
//           <div className="absolute inset-y-0 -left-20 flex items-center">
//             <Button
//               variant="ghost"
//               size="icon"
//               className="hover:bg-background/80 hover:text-primary transition-colors"
//               onClick={handlePrevious}
//             >
//               <ChevronLeft className="w-8 h-8" />
//             </Button>
//           </div>

//           <div className="absolute inset-y-0 -right-20 flex items-center">
//             <Button
//               variant="ghost"
//               size="icon"
//               className="hover:bg-background/80 hover:text-primary transition-colors"
//               onClick={handleNext}
//             >
//               <ChevronRight className="w-8 h-8" />
//             </Button>
//           </div>

//           <div className="relative h-[500px] overflow-hidden">
//             <AnimatePresence initial={false} custom={direction}>
//               <motion.div
//                 key={currentIndex}
//                 custom={direction}
//                 variants={slideVariants}
//                 initial="enter"
//                 animate="center"
//                 exit="exit"
//                 transition={{
//                   x: { type: "spring", stiffness: 300, damping: 30 },
//                   opacity: { duration: 0.2 },
//                   scale: { duration: 0.4 }
//                 }}
//                 className="absolute inset-0"
//               >
//                 <div className="bg-card rounded-lg overflow-hidden shadow-lg border border-border/50 h-full">
//                   <div 
//                     className="relative h-64 cursor-pointer"
//                     onClick={() => setSelectedImage(certificates[currentIndex].image)}
//                   >
//                     <Image
//                       src={certificates[currentIndex].image}
//                       alt={certificates[currentIndex].title}
//                       fill
//                       className="object-cover transition-transform duration-300 hover:scale-105"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//                     <div className="absolute bottom-4 left-4">
//                       <span className={`inline-block px-2 py-1 rounded-md text-sm ${certificates[currentIndex].badgeColor}`}>
//                         {certificates[currentIndex].issuer}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="p-8">
//                     <div className="flex items-center gap-2 mb-4">
//                       <Award className="w-6 h-6 text-primary" />
//                       <h3 className="text-xl font-semibold">{certificates[currentIndex].title}</h3>
//                     </div>
//                     <p className="text-muted-foreground text-lg mb-6">{certificates[currentIndex].description}</p>
//                     <div className="text-sm text-muted-foreground">
//                       Issued: {certificates[currentIndex].date}
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             </AnimatePresence>
//           </div>

//           <div className="flex justify-center mt-8 gap-2">
//             {certificates.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => {
//                   setDirection(index > currentIndex ? 1 : -1)
//                   setCurrentIndex(index)
//                 }}
//                 className="p-1"
//               >
//                 <div
//                   className={`w-8 h-2 rounded-full transition-colors ${
//                     index === currentIndex
//                       ? "bg-primary"
//                       : "bg-primary/20"
//                   }`}
//                 />
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       <AnimatePresence>
//         {selectedImage && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
//             onClick={() => setSelectedImage(null)}
//           >
//             <motion.div
//               initial={{ scale: 0.9 }}
//               animate={{ scale: 1 }}
//               exit={{ scale: 0.9 }}
//               className="relative max-w-4xl w-full mx-4"
//               onClick={e => e.stopPropagation()}
//             >
//               <button
//                 onClick={() => setSelectedImage(null)}
//                 className="absolute -top-12 right-0 text-foreground hover:text-primary transition-colors"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//               <div className="relative aspect-video rounded-lg overflow-hidden">
//                 <Image
//                   src={selectedImage}
//                   alt="Certificate"
//                   fill
//                   className="object-contain"
//                   priority
//                 />
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   )
// }
"use client"

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Award, ChevronLeft, ChevronRight, X, ExternalLink } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const certificates = [
  {
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2023",
    description: "Expertise in designing distributed systems and deploying applications on AWS infrastructure with focus on scalability, security, and cost optimization.",
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&h=600&fit=crop",
    badgeColor: "bg-[#FF9900]/10 text-[#FF9900]",
    gradient: "from-orange-500 to-yellow-500",
    skills: ["AWS EC2", "S3", "Lambda", "CloudFormation", "VPC", "IAM"]
  },
  {
    title: "Google Cloud Professional",
    issuer: "Google Cloud",
    date: "2023",
    description: "Advanced knowledge in cloud architecture and Google Cloud Platform services including compute, storage, networking, and machine learning.",
    image: "https://images.unsplash.com/photo-1481487196290-c152efe083f5?w=800&h=600&fit=crop",
    badgeColor: "bg-[#4285F4]/10 text-[#4285F4]",
    gradient: "from-blue-500 to-cyan-500",
    skills: ["GCP Compute", "BigQuery", "Kubernetes", "Cloud Functions", "Pub/Sub", "AI/ML"]
  },
  {
    title: "Azure Solutions Expert",
    issuer: "Microsoft",
    date: "2022",
    description: "Specialized in Microsoft Azure cloud services and solutions architecture with emphasis on hybrid cloud environments and enterprise integration.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
    badgeColor: "bg-[#00A4EF]/10 text-[#00A4EF]",
    gradient: "from-blue-600 to-indigo-600",
    skills: ["Azure VMs", "App Service", "Azure SQL", "Active Directory", "DevOps", "ARM Templates"]
  },
  {
    title: "React Native Specialist",
    issuer: "Meta",
    date: "2023",
    description: "Expert-level proficiency in React Native development for cross-platform mobile applications with performance optimization.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
    badgeColor: "bg-[#61DAFB]/10 text-[#61DAFB]",
    gradient: "from-cyan-500 to-blue-500",
    skills: ["React Native", "Redux", "TypeScript", "Expo", "Native Modules", "Performance"]
  },
  {
    title: "Kubernetes Administrator",
    issuer: "Cloud Native Computing Foundation",
    date: "2022",
    description: "Certified in Kubernetes cluster administration, container orchestration, and cloud-native application deployment.",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=600&fit=crop",
    badgeColor: "bg-[#326CE5]/10 text-[#326CE5]",
    gradient: "from-blue-600 to-purple-600",
    skills: ["Kubernetes", "Docker", "Helm", "Istio", "Monitoring", "Security"]
  }
]

export function Certifications() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [direction, setDirection] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  const minSwipeDistance = 50

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
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      handleNext()
    } else if (isRightSwipe) {
      handlePrevious()
    }
  }

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
    <section ref={containerRef} className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-orange-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-orange-950/30" />
      
      {/* Floating Elements */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{ y }}
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-orange-400/30 to-yellow-600/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-orange-600/30 rounded-full blur-3xl" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-orange-800 to-slate-900 dark:from-white dark:via-orange-200 dark:to-white bg-clip-text text-transparent mb-6">
            Certifications & Achievements
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Professional certifications that validate my expertise in cloud technologies and development
          </p>
        </motion.div>

        {/* Desktop View - Multiple Cards */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="apple-card group cursor-pointer"
                onClick={() => setSelectedImage(cert.image)}
              >
                <div className="relative h-48 overflow-hidden rounded-t-3xl">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
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
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {cert.title}
                    </h3>
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
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Issued: {cert.date}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile View - Swipeable Cards */}
        <div className="lg:hidden relative max-w-sm mx-auto">
          <div className="absolute inset-y-0 -left-12 flex items-center z-10">
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 rounded-full glass hover:scale-110"
              onClick={handlePrevious}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </div>

          <div className="absolute inset-y-0 -right-12 flex items-center z-10">
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 rounded-full glass hover:scale-110"
              onClick={handleNext}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          <div 
            className="relative h-[500px] overflow-hidden rounded-3xl"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
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
                <div className="apple-card h-full cursor-pointer" onClick={() => setSelectedImage(certificates[currentIndex].image)}>
                  <div className="relative h-56 overflow-hidden rounded-t-3xl">
                    <Image
                      src={certificates[currentIndex].image}
                      alt={certificates[currentIndex].title}
                      fill
                      className="object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${certificates[currentIndex].gradient} opacity-20`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${certificates[currentIndex].badgeColor} backdrop-blur-sm`}>
                        {certificates[currentIndex].issuer}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2 rounded-xl bg-gradient-to-r ${certificates[currentIndex].gradient} text-white`}>
                        <Award className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {certificates[currentIndex].title}
                      </h3>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                      {certificates[currentIndex].description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {certificates[currentIndex].skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      Issued: {certificates[currentIndex].date}
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
                className={`swipe-dot ${index === currentIndex ? 'active' : ''}`}
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
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="relative aspect-video">
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