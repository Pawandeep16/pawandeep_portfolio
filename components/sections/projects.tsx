// "use client";

// import { motion } from "framer-motion";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { ExternalLink, Github } from "lucide-react";



// export function Projects() {
//   return (
//     <section id="projects" className="py-20 bg-muted/50">
//       <div className="container mx-auto px-4">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center mb-12"
//         >
//           <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
//           <p className="text-muted-foreground max-w-2xl mx-auto">
//             A selection of my recent work and personal projects.
//           </p>
//         </motion.div>

//         <div className="overflow-x-auto">
//           <motion.div
//             className="flex gap-6"
//             initial="hidden"
//             animate="visible"
//             variants={{
//               hidden: { opacity: 0 },
//               visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
//             }}
//           >
//             {projects.map((project) => (
//               <motion.div
//                 key={project.title}
//                 className="bg-card rounded-lg overflow-hidden shadow-lg flex-shrink-0 w-80"
//                 variants={{
//                   hidden: { opacity: 0, x: 100 },
//                   visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
//                 }}
//               >
//                 <div className="relative h-48">
//                   <Image
//                     src={project.image}
//                     alt={project.title}
//                     fill
//                     className="object-cover"
//                   />
//                 </div>
//                 <div className="p-6">
//                   <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
//                   <p className="text-muted-foreground mb-4">{project.description}</p>
//                   <div className="flex flex-wrap gap-2 mb-4">
//                     {project.tags.map((tag) => (
//                       <span
//                         key={tag}
//                         className="bg-primary/10 text-primary text-sm px-2 py-1 rounded"
//                       >
//                         {tag}
//                       </span>
//                     ))}
//                   </div>
//                   <div className="flex gap-4">
//                     <Button variant="outline" size="sm" asChild>
//                       <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
//                         <ExternalLink className="w-4 h-4 mr-2" />
//                         Live Demo
//                       </a>
//                     </Button>
//                     <Button variant="outline" size="sm" asChild>
//                       <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
//                         <Github className="w-4 h-4 mr-2" />
//                         Code
//                       </a>
//                     </Button>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }


"use client"

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect, useRef } from "react"

const projects = [
  {
    title: "Covid-19 Tracker",
    description: "A full-stack e-commerce solution with real-time inventory management.",
    image: "https://cdn.leonardo.ai/users/46b1b318-d8a6-4668-9037-68754ff6aa5f/generations/68bf48ce-c506-4604-98fc-408a76020c05/Leonardo_Phoenix_09_Create_a_vibrant_and_informative_thumbnail_3.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma"],
    liveUrl: "https://tracker-6f237.web.app/",
    githubUrl: "https://github.com/Pawandeep16",
  },
  {
    title: "Advanced Analysis Tool",
    description: "A modern portfolio website with dark mode and animations.",
    image: "https://res.cloudinary.com/dpjsyk9yu/image/upload/v1736621325/advanced_analysis_tool_aciwiy.webp",
    tags: ["React", "Framer Motion", "Tailwind CSS"],
    liveUrl: "https://doc-analysis-tool.vercel.app/",
    githubUrl: "https://github.com/Docinsight-Devs/advanced_legal_doc_analysis_tool/tree/production",
  },
  {
    title: "Portfolio Website",
    description: "A modern portfolio website with dark mode and animations.",
    image: "https://static.vecteezy.com/system/resources/previews/011/537/749/non_2x/people-work-portfolio-concept-for-website-template-landing-homepage-with-modern-isometric-flat-free-vector.jpg",
    tags: ["React", "Framer Motion", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "https://github.com/Pawandeep16",
  },
  {
    title: "Amazon Clone",
    description: "A Full Stack Application which is the Replica of the Amazon.",
    image: "https://gradblog.schulich.yorku.ca/wp-content/uploads/2018/08/Amazon.png",
    tags: ["React", "Node.js", "Firebase", "Socket.io", "Ant Icons"],
    liveUrl: "https://amazoon-1325.web.app/",
    githubUrl: "https://github.com/Pawandeep16",
  },
  {
    title: "Erp Next - Educational Institute Appplciation",
    description: "A Full Stack Application which is the Replica of the Amazon.",
    image: "https://cdn.leonardo.ai/users/46b1b318-d8a6-4668-9037-68754ff6aa5f/generations/ea9070d1-fb7b-42e3-9211-e2f545f0c068/Leonardo_Phoenix_09_A_modern_and_sleek_realtime_chat_app_inter_2.jpg?w=512",
    tags: ["React", "Node.js", "Firebase", "Socket.io", "Ant Icons"],
    liveUrl: "https://chaterr.netlify.app/",
    githubUrl: "https://github.com/Pawandeep16",
  },
  {
    title: "Event Notifier - college Project",
    description: "A Full Stack Application which is the Replica of the Amazon.",
    image: "https://cdn.leonardo.ai/users/46b1b318-d8a6-4668-9037-68754ff6aa5f/generations/ea9070d1-fb7b-42e3-9211-e2f545f0c068/Leonardo_Phoenix_09_A_modern_and_sleek_realtime_chat_app_inter_2.jpg?w=512",
    tags: ["React", "Node.js", "Firebase", "Socket.io", "Ant Icons"],
    liveUrl: "https://chaterr.netlify.app/",
    githubUrl: "https://github.com/Pawandeep16/Major-Project-EventManager",
  },
  {
    title: "Real Time Chat App",
    description: "A Full Stack Application which is the Replica of the Amazon.",
    image: "https://cdn.leonardo.ai/users/46b1b318-d8a6-4668-9037-68754ff6aa5f/generations/ea9070d1-fb7b-42e3-9211-e2f545f0c068/Leonardo_Phoenix_09_A_modern_and_sleek_realtime_chat_app_inter_2.jpg?w=512",
    tags: ["React", "Node.js", "Firebase", "Socket.io", "Ant Icons"],
    liveUrl: "https://chaterr.netlify.app/",
    githubUrl: "https://github.com/Pawandeep16",
  },
  {
    title: "Notes App",
    description: "A collaborative task management application with real-time updates.",
    image: "https://i0.wp.com/highschool.latimes.com/wp-content/uploads/2019/01/45692459364_2d91368a04_z.jpg?fit=640%2C427&ssl=1",
    tags: ["React", "Node.js", "MongoDB", "Socket.io"],
    liveUrl: "https://gne-notes.web.app/",
    githubUrl: "https://github.com/Pawandeep16",
  },
  {
    title: "Disney Clone",
    description: "A collaborative task management application with real-time updates.",
    image: "https://i0.wp.com/highschool.latimes.com/wp-content/uploads/2019/01/45692459364_2d91368a04_z.jpg?fit=640%2C427&ssl=1",
    tags: ["React", "Node.js", "MongoDB", "Socket.io"],
    liveUrl: "https://gne-notes.web.app/",
    githubUrl: "https://github.com/Pawandeep16/disneyClone",
  },
  {
    title: "Linkedin Clone",
    description: "A collaborative task management application with real-time updates.",
    image: "https://media.licdn.com/dms/image/D5612AQH_wBNAqIO3Lw/article-cover_image-shrink_720_1280/0/1685507296579?e=2147483647&v=beta&t=DcNhosKbQ_jI50J-8BA8YLLWL6rfGfutaAQ3t6I9c2U",
    tags: ["React", "Node.js", "MongoDB", "Socket.io"],
    liveUrl: "https://gne-notes.web.app/",
    githubUrl: "https://github.com/Pawandeep16/LinkedIn-Clone",
  },
  {
    title: "Netflix Clone",
    description: "A collaborative task management application with real-time updates.",
    image: "https://images.ctfassets.net/y2ske730sjqp/1aONibCke6niZhgPxuiilC/2c401b05a07288746ddf3bd3943fbc76/BrandAssets_Logos_01-Wordmark.jpg?w=940",
    tags: ["React", "Node.js", "MongoDB", "Socket.io"],
    liveUrl: "https://netflix-34510.web.app/",
    githubUrl: "https://github.com/Pawandeep16/Netflix-Clone-with-React-incl.-Stripe",
  },
  
  
];

export function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  
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
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1))
  }

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrevious()
      if (e.key === 'ArrowRight') handleNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <section ref={containerRef} className="py-20 relative overflow-hidden">
      {/* Background with seamless blending */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-white to-orange-50/30 dark:from-purple-950/50 dark:via-slate-900 dark:to-orange-950/30" />
      
      {/* Floating Elements */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{ y }}
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-400/30 to-pink-600/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-purple-600/30 rounded-full blur-3xl" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-purple-800 to-slate-900 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent mb-6">
            Featured Projects
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            A selection of my recent work and personal projects that showcase my skills and creativity
          </p>
        </motion.div>

        {/* Desktop View - Horizontal Scrolling */}
        <div className="hidden lg:block relative">
          {/* Navigation Arrows */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full glass hover:scale-110 transition-all duration-300 shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full glass hover:scale-110 transition-all duration-300 shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Scrollable Container */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide pb-4 px-12"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="apple-card group flex-shrink-0 w-96"
              >
                <div className="relative h-48 overflow-hidden rounded-t-3xl">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-20`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs rounded-full">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className={`bg-gradient-to-r ${project.gradient} text-white flex-1`}>
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Demo
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Github className="w-3 h-3 mr-1" />
                      Code
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile View - Single Card with Navigation */}
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
            className="relative h-[600px] overflow-hidden rounded-3xl"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <motion.div
              key={currentIndex}
              initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <div className="apple-card h-full">
                <div className="relative h-56 overflow-hidden rounded-t-3xl">
                  <Image
                    src={projects[currentIndex].image}
                    alt={projects[currentIndex].title}
                    fill
                    className="object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${projects[currentIndex].gradient} opacity-20`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                    {projects[currentIndex].title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                    {projects[currentIndex].description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {projects[currentIndex].tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button className={`bg-gradient-to-r ${projects[currentIndex].gradient} text-white flex-1`}>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Github className="w-4 h-4 mr-2" />
                      View Code
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Swipe Indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-purple-500 w-8' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}