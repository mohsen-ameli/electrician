import Header from "@/components/header"
import Image from "next/image"
import React from "react"

export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 lg:px-20 lg:pt-8" id="about-us">
      <Header title="about us" description="" />

      <div className="w-full items-center space-y-4 lg:flex lg:space-x-4">
        <div className="relative h-[300px] w-full lg:min-w-[500px]">
          <Image
            src="/lights.jpg"
            alt="lights"
            fill
            className="rounded-2xl object-cover shadow-2xl lg:mx-0 lg:drop-shadow-2xl"
          />
        </div>
        <div className="space-y-2 lg:pl-16 lg:text-left">
          <h1 className="mx-auto mb-3 w-fit border-b-2 border-yellow-400 pb-1 text-2xl capitalize lg:mx-0 lg:mr-auto lg:text-4xl">
            Our goal
          </h1>
          <h1 className="text-lg leading-normal lg:text-xl">
            Echo Power Electric is your premier destination for comprehensive
            electrical solutions. With years of experience, our dedicated team
            of expert electricians specializes in a wide range of services, from
            intricate installations to prompt repairs.
          </h1>
        </div>
      </div>

      <div className="mt-8 items-center space-y-4 lg:flex lg:flex-row-reverse lg:space-x-4">
        <div className="relative h-[300px] w-full lg:min-w-[500px]">
          <Image
            src="/electrician2.jpg"
            alt="electrician2"
            fill
            className="rounded-2xl object-cover shadow-2xl lg:mx-0 lg:drop-shadow-2xl"
          />
        </div>
        <div className="space-y-2 lg:pr-16 lg:text-left">
          <h1 className="mx-auto mb-3 w-fit border-b-2 border-yellow-400 pb-1 text-2xl capitalize lg:mx-0 lg:mr-auto lg:text-4xl">
            Our mission
          </h1>
          <h1 className="text-lg leading-normal lg:text-xl">
            We are committed to enhancing the safety and efficiency of your home
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
