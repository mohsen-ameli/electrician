"use client"

import * as React from "react"
import Link from "next/link"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Button } from "./ui/button"
import Authed from "./authed"
import { ModeToggle } from "./theme-toggle"
import { article } from "@prisma/client"

export default function Menu({
  residential,
  commercial,
}: {
  residential: article[]
  commercial: article[]
}) {
  return (
    <div className="hidden w-full items-center justify-center gap-6 bg-slate-200 px-32 py-4 lg:flex">
      <Link href="/" legacyBehavior passHref>
        <Button
          variant="ghost"
          className="text-base font-normal text-black transition-all hover:scale-95"
        >
          Home
        </Button>
      </Link>

      <NavigationMenu>
        <NavigationMenuList className="gap-6">
          <NavigationMenuItem>
            <Link href="/article/residential/">
              <NavigationMenuTrigger>Residential</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {residential.map(service => (
                    <ListItem
                      key={service.slug}
                      title={service.title}
                      href={`/article/residential/${service.slug}`}
                    >
                      {service.content}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/article/commercial/">
              <NavigationMenuTrigger>Commercial</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {commercial.map(service => (
                    <ListItem
                      key={service.slug}
                      title={service.title}
                      href={`/article/commercial/${service.slug}`}
                    >
                      {service.content}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

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

      <Link href="/article/blog">
        <Button
          variant="ghost"
          className="text-base font-normal text-black transition-all hover:scale-95"
        >
          Blog
        </Button>
      </Link>

      <Authed mobile={false} />

      <ModeToggle />
    </div>
  )
}

function ListItem({
  title,
  children,
  href,
}: {
  title: string
  children: string
  href: string
}) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          href={href}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
