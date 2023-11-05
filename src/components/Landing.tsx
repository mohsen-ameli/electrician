import Image from "next/image"
import React from "react"
import { Button } from "./ui/button"
import Link from "next/link"

export default function Landing() {
  return (
    <div className="w-full h-screen relative">
      <div className="bg-[rgba(30,42,60,0.5)] z-10 w-full h-full absolute"></div>
      <Image
        src="/electrician.jpg"
        alt="electrician"
        fill
        className="object-cover"
      />

      <div className="absolute -translate-x-1/2 top-1/4 left-1/2 z-20 text-center w-full space-y-4">
        <h1 className="font-semibold text-6xl leading-snug capitalize text-white w-[60%] mx-auto">
          Empower your home with our expert electrical services
        </h1>
        <h1 className="w-[40%] mx-auto text-lg text-slate-200">
          Experience top-tier electrical solutions tailored to your needs - from
          installations to repairs, we're your trusted partner for a brighter,
          safer, and more efficient future.
        </h1>
        <div className="flex gap-x-4 mx-auto w-fit">
          <Button variant="outline">
            <Link href="/services">Get Started</Link>
          </Button>
          <Button variant="outline">
            <Link href="/contact-us">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
