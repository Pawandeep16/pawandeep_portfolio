"use client"

import { motion } from "framer-motion"
import { Download, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
      setIsOpen(false)
    }
  }

  const handleDownload = () => {
    const resumeUrl = '/resume.pdf' // Path to your resume in the public folder
    const link = document.createElement('a')
    link.href = resumeUrl
    link.download = 'pawandeep-singh-resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const menuItems = ["Home", "Skills", "Education", "Certifications", "Projects", "Gallery", "Testimonials", "Contact"]

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold"
        >
          Pawandeep
        </motion.div>
        
        <nav className="hidden md:flex items-center space-x-8">
          {menuItems.map((item, i) => (
            <motion.button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              {item}
            </motion.button>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Resume
          </Button>
          <ThemeToggle />
          
          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  {menuItems.map((item, i) => (
                    <motion.button
                      key={item}
                      onClick={() => scrollToSection(item.toLowerCase())}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                      className="flex items-center space-x-2 text-foreground/80 hover:text-foreground transition-colors"
                    >
                      {item}
                    </motion.button>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  )
}