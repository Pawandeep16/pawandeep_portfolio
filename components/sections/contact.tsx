"use client"

import { motion } from "framer-motion"
import { ContactForm } from "@/components/contact-form"

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
          </motion.div>

          <div className="flex justify-center">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}