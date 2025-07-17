import Header from "@/components/header"
import Image from "next/image"
import React from "react"

export default function Gallery() {
  return (
    <div className="container mx-auto px-4 lg:px-20 lg:pt-8" id="gallery">
      <Header title="Our work's gallery" description="" />

      <div className="mt-8 flex flex-wrap gap-4">
        {[0, 1, 2, 3, 4].map(image => (
          <div key={image} className="relative h-[200px] w-full lg:w-[400px]">
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
