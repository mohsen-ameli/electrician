import { Mail, Map, Phone } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <div className="dark:bg-slate-800 bg-slate-400 shadow-xl p-10 mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-20">
        <div>
          <h1 className="border-b-2 border-yellow-400 pb-1 mb-4 w-fit uppercase font-semibold">
            Echo Power Electric
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            omnis iste animi accusamus inventore ea quis quo laudantium cum
            eaque?
          </p>
        </div>
        <div>
          <h1 className="border-b-2 border-yellow-400 pb-1 mb-4 w-fit uppercase font-semibold">
            Quick Links
          </h1>
          {/* prettier-ignore */}
          <ul className="space-y-4">
            <li><Link href="/">Home</Link></li>
            <li><Link href="about-us">About Us</Link></li>
            <li><Link href="gallery">Gallery</Link></li>
            <li><Link href="contact-us">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h1 className="border-b-2 border-yellow-400 pb-1 mb-4 w-fit uppercase font-semibold">
            Contact Us
          </h1>
          <ul className="space-y-4">
            <li className="flex items-center gap-x-4">
              <Phone /> 123456789
            </li>
            <li className="flex items-center gap-x-4">
              <Mail /> email@email.com
            </li>
            <li className="flex items-center gap-x-4">
              <Map /> 123 Street, City, State, Country
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t-2 border-yellow-400 pt-2 mt-8 w-full uppercase">
        copyright © 2023 Echo Power Electric. all rights reserved.
      </div>
    </div>
  )
}
