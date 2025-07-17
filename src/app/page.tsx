import AboutUs from "./about-us"
import Gallery from "./gallery"
import ContactUs from "./contact-us"
import Hero from "./hero"

export default function page() {
  return (
    <div className="flex flex-col gap-12">
      <Hero />
      <AboutUs />
      <Gallery />
      <ContactUs />
    </div>
  )
}
