import emailjs from "@emailjs/browser"

interface EmailData {
  name: string
  email: string
  message: string
}

export async function sendEmail(form: HTMLFormElement) {
  return emailjs.sendForm(
    'YOUR_SERVICE_ID',
    'YOUR_TEMPLATE_ID',
    form,
    'YOUR_PUBLIC_KEY'
  )
}