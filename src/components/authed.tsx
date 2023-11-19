"use client"

import Link from "next/link"
import React, { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { usePathname } from "next/navigation"
import { isAuthenticated } from "@/lib/is-authenticated"

export default function Authed() {
  const [authenticated, setAuthenticated] = useState(false)
  const path = usePathname()

  async function getAuth() {
    setAuthenticated(await isAuthenticated())
  }

  useEffect(() => {
    getAuth()
  }, [path])

  if (!authenticated) return <></>

  return (
    <Link href="/article/create/">
      <Button
        variant="ghost"
        className="text-base font-normal text-black transition-all hover:scale-95"
      >
        Create Article
      </Button>
    </Link>
  )
}
