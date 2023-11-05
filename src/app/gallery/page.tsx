import Image from "next/image"
import React from "react"

export default function Gallery() {
  const images = [0, 1, 2, 3, 4]

  return (
    <div className="container px-20 p-8 mx-auto">
      <h1 className="text-center capitalize text-4xl font-bold border-b-2 border-yellow-400 pb-4">
        Our work's gallery
      </h1>

      <div className="flex flex-wrap gap-4 mt-8">
        {images.map(image => (
          <Image
            src={`/${image}.jpg`}
            alt={`${image}.jpg`}
            width={400}
            height={200}
            className="rounded-xl object-cover"
          />
        ))}
      </div>
    </div>
  )
}
