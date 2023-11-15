import Header from "@/components/header"
import { Metadata } from "next"
import Image from "next/image"
import React from "react"

export const metadata: Metadata = {
  title: "Echo Power Electric | About Us",
  description: "Learn more about our company.",
}

export default function AboutUs() {
  return (
    <div className="container mx-auto px-20 pt-8">
      <Header
        title="about us"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo est
          alias vel, id iusto, molestiae ab ex necessitatibus"
      />

      <div className="flex items-center gap-4">
        <Image
          src="/lights.jpg"
          width={400}
          height={200}
          alt="lights"
          className="rounded-2xl shadow-2xl drop-shadow-2xl"
        />
        <div className="space-y-2 pl-16 text-right">
          <h1 className="mb-3 ml-auto w-fit border-b-2 border-yellow-400 pb-1 text-4xl capitalize">
            Our goal
          </h1>
          <h1 className="text-xl leading-normal">
            Our company, PowerTech Electric, is your premier destination for
            comprehensive electrical solutions. With years of experience, our
            dedicated team of expert electricians specializes in a wide range of
            services, from intricate installations to prompt repairs.
          </h1>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-4">
        <div className="space-y-2 pr-16 text-left">
          <h1 className="mb-3 w-fit border-b-2 border-yellow-400 pb-1 text-4xl capitalize">
            Our mission
          </h1>
          <h1 className="text-xl leading-normal">
            We're committed to enhancing the safety and efficiency of your home
            or business with the latest technology and industry best practices.
            Our commitment to excellence, reliability, and a customer-centric
            approach makes us your trusted partner for all your electrical
            needs.
          </h1>
        </div>
        <Image
          src="/electrician2.jpg"
          width={400}
          height={200}
          alt="lights"
          className="rounded-2xl shadow-2xl drop-shadow-2xl"
        />
      </div>
    </div>
  )
}
