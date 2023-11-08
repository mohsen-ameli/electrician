import React from "react"
import { ModeToggle } from "./theme-toggle"
import { Button } from "./ui/button"
import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between py-4 bg-yellow-400 px-40">
      <div className="text-lg hover:scale-95 transition-all">
        <Link href="/" className="text-black">
          Power Source Electric
        </Link>
      </div>

      <div className="flex gap-8 items-center">
        <Link href="/">
          <Button
            variant="ghost"
            className="text-base text-black font-normal hover:scale-95 transition-all"
          >
            Home
          </Button>
        </Link>
        <Link href="/about-us">
          <Button
            variant="ghost"
            className="text-base text-black font-normal hover:scale-95 transition-all"
          >
            About Us
          </Button>
        </Link>
        <Link href="/gallery">
          <Button
            variant="ghost"
            className="text-base text-black font-normal hover:scale-95 transition-all"
          >
            Gallery
          </Button>
        </Link>
        <Link href="/contact-us">
          <Button
            variant="ghost"
            className="text-base text-black font-normal hover:scale-95 transition-all"
          >
            Contact Us
          </Button>
        </Link>
        <ModeToggle />
      </div>
    </nav>
  )
}
