import Header from "@/components/header"
import { Metadata } from "next"
import Image from "next/image"
import React from "react"

export const metadata: Metadata = {
  title: "Echo Power Electric | Gallery",
  description: "View our work's gallery.",
}

export default function Gallery() {
  const images = [0, 1, 2, 3, 4]

  return (
    <div className="container mx-auto px-4 lg:px-20 lg:pt-8">
      <Header
        title="Our work's gallery"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo est
          alias vel, id iusto, molestiae ab ex necessitatibus"
      />

      <div className="mt-8 flex flex-wrap gap-4">
        {images.map(image => (
          <div className="relative h-[200px] w-full lg:w-[400px]">
            <Image
              src={`/${image}.jpg`}
              alt={`${image}.jpg`}
              fill
              className="rounded-xl object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
