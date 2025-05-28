"use client"

import { motion } from "framer-motion"
import { ContactForm } from "@/components/contact-form"

import { Github, Linkedin, Instagram, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

const socialLinks = [
  {
    name: "LinkedIn",
    icon: <Linkedin className="w-5 h-5" />,
    href: "https://www.linkedin.com/in/pawandeep-thandi-2432031ab/",
    color: "hover:text-[#0077B5]"
  },
  {
    name: "GitHub",
    icon: <Github className="w-5 h-5" />,
    href: "https://github.com/Pawandeep16",
    color: "hover:text-[#333]"
  },
  {
    name: "Instagram",
    icon: <Instagram className="w-5 h-5" />,
    href: "https://www.instagram.com/thandipawandeep16/?next=%2F",
    color: "hover:text-[#E4405F]"
  }
]

export function Contact() {
  return (
    <section id="contact" className="min-h-screen pt-20 flex items-center">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? I'd love to hear from you.
              Fill out the form below and I'll get back to you as soon as possible.
            </p>
            <div className="flex justify-center items-center gap-6 mb-12">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-foreground/80 transition-colors ${link.color}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.icon}
                  <span className="sr-only">{link.name}</span>
                </motion.a>
              ))}
              
              <Button
                variant="ghost"
                className="text-foreground/80 hover:text-[#25D366]"
                onClick={() => window.location.href = 'tel:+14168840993'}
              >
                <Phone className="w-5 h-5" />
                <span className="sr-only">Phone</span>
              </Button>
            </div>




          </motion.div>
          

          <div className="flex justify-center">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
