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
    <div className="container mx-auto p-8 px-20">
      <Header
        title="Our work's gallery"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo est
          alias vel, id iusto, molestiae ab ex necessitatibus"
      />

      <div className="mt-8 flex flex-wrap gap-4">
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
