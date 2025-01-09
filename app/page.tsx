"use client"

import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Typewriter } from "@/components/typewriter"
import { useRouter } from "next/navigation"
import { Skills } from "@/components/sections/skills"
import { Projects } from "@/components/sections/projects"
import { Testimonials } from "@/components/sections/testimonials"
import { Gallery } from "@/components/sections/gallary"
import Image from "next/image"
import { Contact } from "@/components/sections/contact"

import { Education } from "@/components/sections/education"
import { Certifications } from "@/components/sections/certificate"

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })

  }
}
export default function Home() {
  const router = useRouter()

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative">
  <div className="absolute inset-0 z-0">
    <Image
      src="https://pawandeep-portfolio.web.app/Assests/pawan.png"
      alt="Background"
      sizes="(max-width: 640px) 100vw, 
             (max-width: 768px) 100vw, 
             (max-width: 1024px) 100vw, 
             100vw"
       fill
      className="object-cover sm:object-left md:object-right lg:w-[800px!important] xl:object-cover xl:w-[900px!important] xl:h-[900px!important]"
      priority
    />
     <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />
    
  </div>

  <div className="container mx-auto px-4 pt-20 relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
      >
        Pawandeep Singh Thandi
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-primary mb-8"
      >
        <Typewriter
          words={[
            
            "Full Stack Developer",
            "Mobile App Developer",
            "Graphics Designer",
            "Illustrator",
            "UI/UX Designer",
          ]}
          delay={3000}
        />
      </motion.div>

      <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8">
        Transforming ideas into stunning digital experiences through innovative design
        and cutting-edge development.
      </p>

      <div className="flex justify-center gap-4">
        <Button size="lg" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
          View Projects
        </Button>
        <Button 
          size="lg" 
          variant="outline"
          onClick={() => scrollToSection('contact')}
        >
          Contact Me
        </Button>
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="absolute mt-10 left-1/2 -translate-x-1/2"
    >
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <ArrowDown className="w-6 h-6 cursor-pointer" onClick={() => scrollToSection('skills')} />
      </motion.div>
    </motion.div>
  </div>
</section>


      {/* Other Sections */}
      <Skills />
      <Projects />
      <Education/>
      <Certifications/>
      <Gallery />
      <Testimonials />
      <Contact/>
    </main>
  )
}