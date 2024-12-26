"use client"

import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Typewriter } from "@/components/typewriter"
import { useRouter } from "next/navigation"
import { Skills } from "@/components/sections/skills"
import { Projects } from "@/components/sections/projects"
import {Contact} from "@/components/sections/contact"
import { Testimonials } from "@/components/sections/testimonials"

export default function Home() {
  const router = useRouter()

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative">
        <div className="container mx-auto px-4 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold mb-4"
            >
              Pawandeep Singh Thandi
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-semibold text-primary mb-8"
            >
              <Typewriter
                words={[
                  "Graphics Designer",
                  "Full Stack Developer",
                  "Illustrator",
                  "UI/UX Designer"
                ]}
                delay={3000}
              />
            </motion.div>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
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
                onClick={() => router.push('/contact')}
              >
                Contact Me
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowDown className="w-6 h-6" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Other Sections */}
      <Skills />
      <Projects />
      <Testimonials />
      <Contact/>
    </main>
  )
}