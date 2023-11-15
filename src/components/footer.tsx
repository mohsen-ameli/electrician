import { Mail, Map, Phone } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <div className="mt-20 bg-slate-400 p-10 shadow-xl dark:bg-slate-800">
      <div className="grid grid-cols-1 gap-20 md:grid-cols-2 xl:grid-cols-3">
        <div>
          <h1 className="mb-4 w-fit border-b-2 border-yellow-400 pb-1 font-semibold uppercase">
            Echo Power Electric
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            omnis iste animi accusamus inventore ea quis quo laudantium cum
            eaque?
          </p>
        </div>
        <div>
          <h1 className="mb-4 w-fit border-b-2 border-yellow-400 pb-1 font-semibold uppercase">
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
          <h1 className="mb-4 w-fit border-b-2 border-yellow-400 pb-1 font-semibold uppercase">
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

      <div className="mt-8 w-full border-t-2 border-yellow-400 pt-2 uppercase">
        copyright © 2023 Echo Power Electric. all rights reserved.
      </div>
    </div>
  )
}
