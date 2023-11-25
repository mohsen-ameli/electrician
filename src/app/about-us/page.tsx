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
    <div className="container mx-auto px-4 lg:px-20 lg:pt-8">
      <Header
        title="about us"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo est
          alias vel, id iusto, molestiae ab ex necessitatibus"
      />

      <div className="items-center space-y-4 lg:flex lg:space-x-4">
        <Image
          src="/lights.jpg"
          width={400}
          height={200}
          alt="lights"
          className="mx-auto rounded-2xl shadow-2xl lg:mx-0 lg:drop-shadow-2xl"
        />
        <div className="space-y-2 lg:pl-16 lg:text-right">
          <h1 className="mx-auto mb-3 w-fit border-b-2 border-yellow-400 pb-1 text-4xl capitalize lg:mx-0 lg:ml-auto">
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

      <div className="mt-8 items-center space-y-4 lg:flex lg:flex-row-reverse lg:space-x-4">
        <Image
          src="/electrician2.jpg"
          width={400}
          height={200}
          alt="lights"
          className="mx-auto rounded-2xl shadow-2xl lg:mx-0 lg:drop-shadow-2xl"
        />
        <div className="space-y-2 lg:pr-16 lg:text-left">
          <h1 className="mx-auto mb-3 w-fit border-b-2 border-yellow-400 pb-1 text-4xl capitalize lg:mx-0">
            Our mission
          </h1>
          <h1 className="pb-4 text-xl leading-normal">
            We're committed to enhancing the safety and efficiency of your home
            or business with the latest technology and industry best practices.
            Our commitment to excellence, reliability, and a customer-centric
            approach makes us your trusted partner for all your electrical
            needs.
          </h1>
        </div>
      </div>
    </div>
  )
}
