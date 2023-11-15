import React from "react"
import { ModeToggle } from "./theme-toggle"
import { Button } from "./ui/button"
import Link from "next/link"
import Authed from "./authed"

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-yellow-400 px-40 py-4 dark:bg-yellow-600">
      <div className="text-lg transition-all hover:scale-95">
        <Link href="/" className="text-black">
          Echo Power Electric
        </Link>
      </div>

      <div className="flex items-center gap-8">
        <Link href="/">
          <Button
            variant="ghost"
            className="text-base font-normal text-black transition-all hover:scale-95"
          >
            Home
          </Button>
        </Link>
        <Link href="/about-us">
          <Button
            variant="ghost"
            className="text-base font-normal text-black transition-all hover:scale-95"
          >
            About Us
          </Button>
        </Link>
        <Link href="/gallery">
          <Button
            variant="ghost"
            className="text-base font-normal text-black transition-all hover:scale-95"
          >
            Gallery
          </Button>
        </Link>
        <Link href="/contact-us">
          <Button
            variant="ghost"
            className="text-base font-normal text-black transition-all hover:scale-95"
          >
            Contact Us
          </Button>
        </Link>
        <Link href="/blog">
          <Button
            variant="ghost"
            className="text-base font-normal text-black transition-all hover:scale-95"
          >
            Blog
          </Button>
        </Link>
        <Authed />
        <ModeToggle />
      </div>
    </nav>
  )
}
