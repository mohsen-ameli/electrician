import { EmailTemplate } from "@/components/email-template"
import { Clock7, Instagram, Mail, Phone } from "lucide-react"
import Link from "next/link"
import React from "react"
import { Resend } from "resend"
import SendButton from "@/components/send-button"
import Header from "@/components/header"

export default async function ContactUs() {
  async function handleSubmit(form: FormData) {
    "use server"

    const name = form.get("name")?.toString()
    const email = form.get("email")?.toString()
    const tel = form.get("tel")?.toString()
    const message = form.get("message")?.toString()

    try {
      const resend = new Resend(process.env.RESEND_API_KEY)

      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: process.env.RESEND_EMAIL!,
        subject: "New Contact " + name,
        react: EmailTemplate({
          name,
          email,
          tel,
          message,
        }) as React.ReactElement,
      })
    } catch (error) {}
  }

  return (
    <div className="container mx-auto px-4 lg:px-20 lg:pt-8" id="contact-us">
      <Header title="Contact us today!" description="" />
      <div className="mx-auto w-[75%] space-y-8">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          <div className="flex flex-col items-center gap-4 rounded-xl bg-amber-400 p-8 text-center text-black">
            <Clock7 size={70} />
            <div>
              <h1 className="mb-2 text-xl font-bold dark:border-white">
                Work Hours
              </h1>
              8:00 AM - 5:00 PM <br /> Monday - Friday
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 rounded-xl bg-amber-400 p-8 text-center text-black">
            <Phone size={70} />
            <div>
              <h1 className="mb-2 text-xl font-bold dark:border-white">
                Phone Number
              </h1>
              <Link
                href="tel:2345678901"
                className="underline transition-all hover:text-blue-600"
              >
                (234) 567-8901
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 rounded-xl bg-amber-400 p-8 text-center text-black">
            <Mail size={70} />
            <div>
              <h1 className="mb-2 text-xl font-bold dark:border-white">
                Email
              </h1>
              <Link
                href="mailto:email@email.com"
                className="underline transition-all hover:text-blue-600"
              >
                email@email.com
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 rounded-xl bg-amber-400 p-8 text-center text-black">
            <Instagram size={70} />
            <div>
              <h1 className="mb-2 text-xl font-bold dark:border-white">
                Instagram
              </h1>
              <Link
                href="https://www.instagram.com/hassen.ameli/"
                className="underline transition-all hover:text-blue-600"
              >
                @hassen.ameli
              </Link>
            </div>
          </div>
        </div>

        <form action={handleSubmit} className="space-y-6 p-8">
          <h1 className="text-center text-3xl font-bold dark:border-white">
            Get In Touch
          </h1>
          <div className="flex flex-col gap-1">
            <label htmlFor="name">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="rounded-md border-2 border-black p-2"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              title="Please enter a valid email address."
              pattern="^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$"
              className="rounded-md border-2 border-black p-2"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="tel">Phone Number</label>
            <input
              type="tel"
              name="tel"
              id="tel"
              className="rounded-md border-2 border-black p-2"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="message">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              id="message"
              required
              className="min-h-[8rem] resize-y rounded-md border-2 border-black p-2"
            />
          </div>

          <SendButton
            actionText="Send"
            pendingText="Sending..."
            doneText="Sent"
          />
        </form>
      </div>

      <div className="space-y-8 py-20">
        {/* <div className="text-center text-3xl">Our Location: 1 yonge street</div> */}
        <iframe
          className="h-[500px] w-full"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2887.2518157736185!2d-79.37676112432204!3d43.64292895309578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4cb295c1d0cf3%3A0x1f29b0772fc15f3!2s1%20Yonge%20St%2C%20Toronto%2C%20ON%20M5E%201E5%2C%20Canada!5e0!3m2!1sen!2sus!4v1699418366873!5m2!1sen!2sus"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  )
}
