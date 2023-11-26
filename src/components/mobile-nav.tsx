"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { Menu } from "lucide-react"
import { article } from "@prisma/client"
import Link from "next/link"
import { useState } from "react"
import Authed from "./authed"
import { ModeToggle } from "./theme-toggle"
import { ScrollArea } from "./ui/scroll-area"

export function MobileNav({
  residential,
  commercial,
}: {
  residential: article[]
  commercial: article[]
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="m-2 flex items-center gap-2 lg:hidden">
        <Button
          className="w-full"
          variant="outline"
          onClick={() => setOpen(true)}
        >
          <Menu />
        </Button>
        <ModeToggle className="w-full" />
      </div>
      <Sheet open={open} onOpenChange={e => setOpen(e)}>
        <SheetContent side="left" className="bg-yellow-400 dark:bg-yellow-700">
          <ScrollArea className="h-full w-full text-black">
            <Link
              onClick={() => setOpen(false)}
              href="/"
              className="flex flex-1 items-center justify-between border-b py-4 font-medium transition-all hover:underline"
            >
              Home
            </Link>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Commercial</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-2">
                    {commercial.map(service => (
                      <Link
                        onClick={() => setOpen(false)}
                        key={service.slug}
                        className="p-2 hover:underline"
                        title={service.title}
                        href={`/article/commercial/${service.slug}`}
                      >
                        <h1 className="text-xl font-bold">{service.title}</h1>
                        {/* show the first 20 words of the content */}
                        <p className="">
                          {service.content.split(" ").slice(0, 20).join(" ")}
                        </p>
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Residential</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-2">
                    {residential.map(service => (
                      <Link
                        onClick={() => setOpen(false)}
                        key={service.slug}
                        className="p-2 hover:underline"
                        title={service.title}
                        href={`/article/residential/${service.slug}`}
                      >
                        <h1 className="text-xl font-bold">{service.title}</h1>
                        {/* show the first 20 words of the content */}
                        <p className="">
                          {service.content.split(" ").slice(0, 20).join(" ")}
                        </p>
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Link
              onClick={() => setOpen(false)}
              href="/about-us"
              className="flex flex-1 items-center justify-between border-b py-4 font-medium transition-all hover:underline"
            >
              About Us
            </Link>

            <Link
              onClick={() => setOpen(false)}
              href="/gallery"
              className="flex flex-1 items-center justify-between border-b py-4 font-medium transition-all hover:underline"
            >
              Gallery
            </Link>

            <Link
              onClick={() => setOpen(false)}
              href="/contact-us"
              className="flex flex-1 items-center justify-between border-b py-4 font-medium transition-all hover:underline"
            >
              Contact Us
            </Link>

            <Link
              onClick={() => setOpen(false)}
              href="/article/blog"
              className="flex flex-1 items-center justify-between border-b py-4 font-medium transition-all hover:underline"
            >
              Blog
            </Link>

            <Authed onClick={() => setOpen(false)} mobile />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  )
}
