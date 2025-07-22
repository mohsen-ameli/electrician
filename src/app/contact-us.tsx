import { EmailTemplate } from "@/components/email-template"
import { Clock7, Instagram, Mail, Phone } from "lucide-react"
import Link from "next/link"
import React from "react"
import { Resend } from "resend"
import SendButton from "@/components/send-button"
import Header from "@/components/header"
import { contact } from "@/contact"

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
      <div className="mx-auto space-y-8 lg:w-[75%]">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center gap-4 rounded-xl bg-amber-400 p-2 text-center text-black lg:p-8">
            <Clock7 className="size-10 lg:size-16" />
            <div>
              <h1 className="mb-2 font-bold dark:border-white lg:text-xl">
                Work Hours
              </h1>
              8:00 AM - 5:00 PM <br /> Monday - Friday
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 rounded-xl bg-amber-400 p-2 text-center text-black lg:p-8">
            <Phone className="size-10 lg:size-16" />
            <div>
              <h1 className="mb-2 font-bold dark:border-white lg:text-xl">
                Phone Number
              </h1>
              <Link
                href={`tel:${contact.phone}`}
                className="underline transition-all hover:text-blue-600"
              >
                {contact.phoneFormatted}
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 rounded-xl bg-amber-400 p-2 text-center text-black lg:p-8">
            <Mail className="size-10 lg:size-16" />
            <div>
              <h1 className="mb-2 font-bold dark:border-white lg:text-xl">
                Email
              </h1>
              <Link
                href={`mailto:${contact.email}`}
                className="underline transition-all hover:text-blue-600"
              >
                {contact.email}
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 rounded-xl bg-amber-400 p-2 text-center text-black lg:p-8">
            <Instagram className="size-10 lg:size-16" />
            <div>
              <h1 className="mb-2 font-bold dark:border-white lg:text-xl">
                Instagram
              </h1>
              <Link
                href={`https://www.instagram.com/${contact.instagram}/`}
                className="underline transition-all hover:text-blue-600"
              >
                {contact.instagram}
              </Link>
            </div>
          </div>
        </div>

        <form action={handleSubmit} className="space-y-6 p-2 lg:p-8">
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

      <div className="space-y-8 py-20" id="map">
        <h1 className="text-center text-3xl font-bold dark:border-white">
          Visit Us
        </h1>
        <iframe
          className="h-[500px] w-full"
          src={contact.mapUrl}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  )
}
