import emailjs from "@emailjs/browser"

interface EmailData {
  name: string
  email: string
  message: string
}

export async function sendEmail(form: HTMLFormElement) {
  return emailjs.sendForm(
    'service_l1r912o',
    'template_9uepqru',
    form,
    'user_6xnkAOnakPLCYPRAVZ4zR'
  )
}