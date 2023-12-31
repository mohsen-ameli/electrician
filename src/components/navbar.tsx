import React from "react"
import Link from "next/link"
import Menu from "./menu"
import prisma from "@/db/prisma-db"
import { Instagram, Phone } from "lucide-react"
import { MobileNav } from "./mobile-nav"

export const revalidate = 20

export default async function Navbar() {
  const residential = await prisma.article.findMany({
    where: { type: "residential" },
  })
  const commercial = await prisma.article.findMany({
    where: { type: "commercial" },
  })

  return (
    <nav className="z-30 flex flex-col">
      <div className="flex flex-col items-center justify-between gap-4 bg-yellow-400 py-6 dark:bg-yellow-600 sm:flex-row sm:px-32 sm:py-12">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl text-black transition-all hover:scale-95"
        >
          Echo Power Electric
        </Link>

        {/* Contact links */}
        <div className="flex flex-col items-center gap-4 text-sm text-black lg:text-lg">
          <Link
            href="tel:2345678901"
            className="flex items-center gap-1 font-semibold transition-all hover:scale-95 hover:text-blue-600 hover:underline lg:gap-4"
          >
            <Phone /> (234) 567-8901
          </Link>

          <Link
            href="https://www.instagram.com/hassen.ameli/"
            className="flex items-center gap-1 font-semibold transition-all hover:scale-95 hover:text-blue-600 hover:underline lg:gap-4"
          >
            <Instagram /> Instagram
          </Link>
        </div>
      </div>

      <MobileNav residential={residential} commercial={commercial} />
      <Menu residential={residential} commercial={commercial} />
    </nav>
  )
}
