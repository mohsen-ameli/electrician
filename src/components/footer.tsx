import { Mail, Map, Phone } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <div className="mt-20 bg-slate-200 p-10 shadow-xl dark:bg-slate-800">
      <div className="grid grid-cols-1 gap-20 md:grid-cols-2 xl:grid-cols-3">
        <div>
          <h1 className="mb-4 w-fit pb-1 font-semibold uppercase">
            Echo Power Electric
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            omnis iste animi accusamus inventore ea quis quo laudantium cum
            eaque?
          </p>
        </div>
        <div>
          <h1 className="mb-2 w-fit pb-1 font-semibold uppercase">
            Quick Links
          </h1>
          {/* prettier-ignore */}
          <ul className="flex flex-col gap-2">
            <Link className="hover:text-cyan-900 hover:underline p-2" href="/">Home</Link>
            <Link className="hover:text-cyan-900 hover:underline p-2" href="/article/residential">Residential</Link>
            <Link className="hover:text-cyan-900 hover:underline p-2" href="/article/commercial">Commercial</Link>
            <Link className="hover:text-cyan-900 hover:underline p-2" href="#about-us">About Us</Link>
            <Link className="hover:text-cyan-900 hover:underline p-2" href="#gallery">Gallery</Link>
            <Link className="hover:text-cyan-900 hover:underline p-2" href="#contact-us">Contact Us</Link>
          </ul>
        </div>
        <div>
          <h1 className="mb-4 w-fit pb-1 font-semibold uppercase">
            Contact Us
          </h1>
          <ul className="space-y-4">
            <li className="flex items-center gap-x-4">
              <Phone /> +1 (647)-394-8541
            </li>
            <li className="flex items-center gap-x-4">
              <Mail /> mohsen.ameli83@gmail.com
            </li>
            <li className="flex items-center gap-x-4">
              <Map /> 123 Street, City, State, Country
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 w-full pt-2 text-sm">
        © 2025 Echo Power Electric.
      </div>
    </div>
  )
}
