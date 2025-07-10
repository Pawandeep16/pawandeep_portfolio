"use client"

import { motion } from "framer-motion"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useContactForm } from "@/hooks/use-contact-form"

export function ContactForm() {
  const { isLoading, handleSubmit } = useContactForm()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="space-y-6 max-w-7xl xl:w-[600px] md:w-[500px]  ">
        
          <Input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full"
          />
        
        
          <Input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full"
          />
        
        
          <Textarea
            name="message"
            placeholder="Your Message"
            required
            className="min-h-[150px] w-full"
          />
        
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            "Sending..."
          ) : (
            <>
              Send Message
              <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </motion.div>
  )
}