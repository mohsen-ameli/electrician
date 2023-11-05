import Image from "next/image"
import React from "react"

export default function AboutUs() {
  return (
    <div className="container px-20 pt-8 mx-auto">
      <div className="flex items-center gap-4">
        <Image
          src="/lights.jpg"
          width={400}
          height={200}
          alt="lights"
          className="rounded-2xl shadow-2xl drop-shadow-2xl"
        />
        <div className="pl-16 text-right space-y-2">
          <h1 className="capitalize text-4xl">Our goal</h1>
          <h1 className="text-xl leading-normal">
            Our company, PowerTech Electric, is your premier destination for
            comprehensive electrical solutions. With years of experience, our
            dedicated team of expert electricians specializes in a wide range of
            services, from intricate installations to prompt repairs.
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-8">
        <div className="pr-16 text-left space-y-2">
          <h1 className="capitalize text-4xl">Our mission</h1>
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
