import Image from "next/image"
import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="h-screen w-full bg-[url('/electrician.jpg')] bg-cover bg-center">
          <div className="flex h-full w-full items-center justify-center backdrop-brightness-50">
            <div className="absolute left-1/2 top-1/4 z-20 w-full -translate-x-1/2 space-y-4 text-center">
              <h1 className="mx-auto w-[60%] text-xl font-semibold capitalize leading-snug text-white md:text-3xl lg:text-6xl">
                Empower your home with our expert electrical services
              </h1>
              <h1 className="mx-auto w-[40%] text-sm text-slate-200 lg:text-lg">
                Experience top-tier electrical solutions tailored to your needs
                - from installations to repairs, we're your trusted partner for
                a brighter, safer, and more efficient future.
              </h1>
              <div className="mx-auto flex w-fit gap-x-4">
                <Link href="about-us">
                  <Button variant="outline">About Us</Button>
                </Link>
                <Link href="contact-us">
                  <Button variant="outline">Contact Us</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
