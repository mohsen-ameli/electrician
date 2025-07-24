"use client"

import Header from "@/components/header"
import Image from "next/image"
import React, { useState } from "react"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { projects } from "@/constants/projects"

export function Video({ path }: { path: string }) {
  return (
    <video
      width="800"
      height="400"
      controls
      preload="none"
      className="h-[400px] w-[800px] object-contain"
    >
      <source src={path} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}

export default function Gallery() {
  const [projId, setProjId] = useState(0)
  const [api, setApi] = React.useState<CarouselApi>()

  return (
    <div className="container mx-auto px-4 lg:px-20 lg:pt-8" id="gallery">
      <Header title="Our work's gallery" description="" />

      <div className="mb-2 flex items-center justify-center gap-3">
        {projects.map((project, index) => (
          <button
            className={
              "text-lg font-semibold hover:text-yellow-600 " +
              (projId === index ? "text-yellow-600" : "text-gray-600")
            }
            onClick={() => {
              setProjId(index)
              api?.scrollTo(0)
            }}
            key={index}
          >
            {project.title}
          </button>
        ))}
      </div>
      <p className="mb-16 text-center text-gray-500">
        {projects[projId].description}
      </p>

      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
        }}
        orientation="vertical"
        className="mx-auto w-full lg:w-[800px]"
      >
        <CarouselContent className="-mt-1 h-[405px] w-full lg:w-[800px]">
          {projects[projId].images.map(image => (
            <CarouselItem key={image} className="pt-1 md:basis-1/2">
              {image.endsWith(".MOV") || image.endsWith(".mp4") ? (
                <Video path={image} />
              ) : (
                <div className="relative h-[400px] w-full lg:w-[800px]">
                  <Image
                    src={image}
                    alt={image}
                    fill
                    className="rounded-xl object-cover"
                  />
                </div>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
