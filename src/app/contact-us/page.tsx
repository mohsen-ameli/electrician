import { Button } from "@/components/ui/button"
import { Instagram, Mail, Phone } from "lucide-react"
import Link from "next/link"
import React from "react"

export default function ContactUs() {
  return (
    <div className="container px-20 p-8 mx-auto">
      <div className="text-center capitalize text-4xl mb-8 font-bold border-b-2 border-yellow-400 pb-4">
        Contact us today!
      </div>
      <div className="grid grid-cols-2 gap-x-32">
        <form action="" className="space-y-4">
          <div className="flex flex-col gap-4">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="border-2 border-black rounded-xl p-2"
            />
          </div>

          <div className="flex flex-col gap-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="border-2 border-black rounded-xl p-2"
            />
          </div>

          <div className="flex flex-col gap-4">
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              id="message"
              className="border-2 border-black rounded-xl p-2"
            />
          </div>

          <Button>Submit</Button>
        </form>

        <div className="bg-yellow-200 opacity-70 rounded-xl p-8">
          <h1 className="text-xl border-b-2 border-black pb-2 font-bold">
            Contact
          </h1>
          <div className="text-xl font-bold mt-8 flex items-center gap-4">
            <Phone /> (234) 567-890
          </div>
          <div className="text-xl font-bold mt-8 flex items-center gap-4">
            <Mail /> email@gmail.com
          </div>
          <Link
            href="https://www.instagram.com/hassen.ameli/"
            className="text-xl underline hover:text-blue-600 transition-all font-bold mt-8 flex items-center gap-4"
          >
            <Instagram /> Instagram
          </Link>
        </div>
      </div>
    </div>
  )
}
