"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { sendEmail } from "@/lib/email"

export function useContactForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const form = e.currentTarget // ✅ Store form reference before awaiting

    try {
      const res = await sendEmail(form)
      console.log("Email sent with status:", res.status)
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      })
      form.reset() // ✅ Use stored reference
    } catch (error) {
      console.error("Caught in form:", error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    handleSubmit,
  }
}
