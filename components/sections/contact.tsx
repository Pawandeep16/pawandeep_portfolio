"use client"

import { motion } from "framer-motion"
import { ContactForm } from "@/components/contact-form"
import { Github, Linkedin, Instagram, Phone, Mail, MapPin } from "lucide-react"

const socialLinks = [
  {
    name: "LinkedIn",
    icon: <Linkedin className="w-6 h-6" />,
    href: "https://www.linkedin.com/in/pawandeep-thandi-2432031ab/",
    color: "hover:text-[#0077B5]",
    bgColor: "hover:bg-[#0077B5]/10",
  },
  {
    name: "GitHub",
    icon: <Github className="w-6 h-6" />,
    href: "https://github.com/Pawandeep16",
    color: "hover:text-[#333] dark:hover:text-white",
    bgColor: "hover:bg-slate-100 dark:hover:bg-slate-800",
  },
  {
    name: "Instagram",
    icon: <Instagram className="w-6 h-6" />,
    href: "https://www.instagram.com/thandipawandeep16",
    color: "hover:text-[#E4405F]",
    bgColor: "hover:bg-[#E4405F]/10",
  },
]

export function Contact() {
  console.log("Sanity Project ID:", process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
  console.log("Sanity Dataset:", process.env.NEXT_PUBLIC_SANITY_DATASET)

  return (
    <section className="min-h-screen flex flex-col pt-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/30" />

      {/* Floating Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-orange-600/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 flex-1 flex flex-col justify-center relative z-10">
        <div className="max-w-5xl mx-auto w-full">
          {/* Title & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 will-change-transform"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 dark:from-white dark:via-blue-200 dark:to-white bg-clip-text text-transparent mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
              Have a project in mind or want to collaborate? I&rsquo;d love to
              hear from you. Fill out the form below and I&rsquo;ll get back to
              you as soon as possible.
            </p>

            {/* Contact Info Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  icon: <Mail className="w-8 h-8" />,
                  title: "Email",
                  info: "thandipawandeep@gmail.com",
                  action: () =>
                    (window.location.href =
                      "mailto:thandipawandeep@gmail.com"),
                },
                {
                  icon: <Phone className="w-8 h-8" />,
                  title: "Phone",
                  info: "+1 (416) 884-0993",
                  action: () => (window.location.href = "tel:+14168840993"),
                },
                {
                  icon: <MapPin className="w-8 h-8" />,
                  title: "Location",
                  info: "Toronto, ON",
                  action: () => {},
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="apple-card p-6 cursor-pointer will-change-transform"
                  onClick={item.action}
                >
                  <div className="text-blue-600 dark:text-blue-400 mb-4 flex justify-center">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    {item.info}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex justify-center items-center gap-4 mb-12">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-4 rounded-full glass text-slate-600 dark:text-slate-300 smooth-transition ${link.color} ${link.bgColor} shadow-lg hover:shadow-xl will-change-transform`}
                >
                  {link.icon}
                  <span className="sr-only">{link.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full max-w-2xl will-change-transform"
            >
              <div className="apple-card p-8 md:p-12">
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
