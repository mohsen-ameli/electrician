import React from "react"
import Link from "next/link"
import Menu from "./menu"
import prisma from "@/db/prisma-db"
import { Instagram, Phone } from "lucide-react"

// const residential = [
//   { id: 0, title: "Service A", description: "Service A description" },
//   { id: 1, title: "Service B", description: "Service B description" },
//   { id: 2, title: "Service C", description: "Service C description" },
//   { id: 3, title: "Service D", description: "Service D description" },
//   { id: 4, title: "Service E", description: "Service E description" },
//   { id: 5, title: "Service F", description: "Service E description" },
// ]
// export type Residential = typeof residential

// const commercial = [
//   { id: 0, title: "Commercial A", description: "Commercial A description" },
//   { id: 1, title: "Commercial B", description: "Commercial B description" },
//   { id: 2, title: "Commercial C", description: "Commercial C description" },
//   { id: 3, title: "Commercial D", description: "Commercial D description" },
//   { id: 4, title: "Commercial E", description: "Commercial E description" },
//   { id: 5, title: "Commercial F", description: "Commercial E description" },
// ]
// export type Commercial = typeof commercial

export default async function Navbar() {
  const residential = await prisma.article.findMany({
    where: { type: "residential" },
  })
  const commercial = await prisma.article.findMany({
    where: { type: "commercial" },
  })

  return (
    <nav className="z-30 flex flex-col">
      <div className="flex items-center justify-between bg-yellow-400 px-32 py-12 dark:bg-yellow-600">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl text-black transition-all hover:scale-95"
        >
          Echo Power Electric
        </Link>

        {/* Contact links */}
        <div className="flex flex-col items-center gap-4 text-lg text-black">
          <Link
            href="tel:2345678901"
            className="flex items-center gap-4 font-semibold transition-all hover:scale-95 hover:text-blue-600 hover:underline"
          >
            <Phone /> (234) 567-8901
          </Link>

          <Link
            href="https://www.instagram.com/hassen.ameli/"
            className="flex items-center gap-4 font-semibold transition-all hover:scale-95 hover:text-blue-600 hover:underline"
          >
            <Instagram /> Instagram
          </Link>
        </div>
      </div>

      <Menu residential={residential} commercial={commercial} />
    </nav>
  )
}
