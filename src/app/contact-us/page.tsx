import { EmailTemplate } from "@/components/email-template"
import { Clock7, Instagram, Mail, Map, Phone } from "lucide-react"
import Link from "next/link"
import React from "react"
import { Resend } from "resend"
import SendButton from "../../components/send-button"
import Header from "@/components/header"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Echo Power Electric | Contact Us",
  description: "Contact us today and get a free quote.",
}

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
    <div className="container px-20 p-8 mx-auto">
      <Header
        title="Contact us today!"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo est
          alias vel, id iusto, molestiae ab ex necessitatibus"
      />
      <div className="grid grid-cols-2 gap-x-32">
        <form action={handleSubmit} className="space-y-6 p-8">
          <h1 className="text-3xl border-b-2 dark:border-white border-black pb-2 font-bold text-center">
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
              className="border-2 border-black rounded-md p-2"
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
              className="border-2 border-black rounded-md p-2"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="tel">Phone Number</label>
            <input
              type="tel"
              name="tel"
              id="tel"
              className="border-2 border-black rounded-md p-2"
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
              className="border-2 border-black rounded-md p-2 resize-y min-h-[8rem]"
            />
          </div>

          <SendButton
            actionText="Send"
            pendingText="Sending..."
            doneText="Sent"
          />
        </form>

        <div className="bg-yellow-200 opacity-70 rounded-xl p-8 text-black text-center">
          <h1 className="text-3xl border-b-2 border-black pb-2 font-bold">
            Contact
          </h1>

          <div className="text-xl font-semibold mt-8 flex items-center gap-4">
            <Clock7 /> Work Hours: 8:00 AM - 5:00 PM (Mon - Fri)
          </div>

          <Link
            href="tel:2345678901"
            className="text-xl underline hover:text-blue-600 transition-all font-semibold mt-8 flex items-center gap-4"
          >
            <Phone /> (234) 567-8901
          </Link>

          <div className="text-xl font-semibold mt-8 flex items-center gap-4">
            <Mail /> email@gmail.com
          </div>

          <Link
            href="https://www.instagram.com/hassen.ameli/"
            className="text-xl underline hover:text-blue-600 transition-all font-semibold mt-8 flex items-center gap-4"
          >
            <Instagram /> Instagram
          </Link>

          <div className="text-xl font-semibold mt-8 flex items-center gap-4">
            <Map /> Address: 1 Yonge Street, Toronto, ON M5E 1E5
          </div>
        </div>
      </div>

      <div className="py-20 space-y-8">
        {/* <div className="text-center text-3xl">Our Location: 1 yonge street</div> */}
        <iframe
          className="w-full h-[500px]"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2887.2518157736185!2d-79.37676112432204!3d43.64292895309578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4cb295c1d0cf3%3A0x1f29b0772fc15f3!2s1%20Yonge%20St%2C%20Toronto%2C%20ON%20M5E%201E5%2C%20Canada!5e0!3m2!1sen!2sus!4v1699418366873!5m2!1sen!2sus"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  )
}
