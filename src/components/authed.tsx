"use client"

import Link from "next/link"
import React, { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { usePathname } from "next/navigation"
import { isAuthenticated } from "@/lib/is-authenticated"
import { cn } from "@/lib/utils"

export default function Authed({
  onClick,
  mobile,
}: {
  onClick?: () => void
  mobile: boolean
}) {
  const [authenticated, setAuthenticated] = useState(false)
  const path = usePathname()

  async function getAuth() {
    setAuthenticated(await isAuthenticated())
  }

  useEffect(() => {
    getAuth()
  }, [path])

  if (!authenticated) return <></>

  if (mobile)
    return (
      <Link
        href="/article/create/"
        onClick={onClick}
        className="flex flex-1 items-center justify-between border-b py-4 font-medium transition-all hover:underline"
      >
        Create Article
      </Link>
    )

  return (
    <Link href="/article/create/" onClick={onClick}>
      <Button
        variant="ghost"
        className="text-base font-normal text-black transition-all hover:scale-95"
      >
        Create Article
      </Button>
    </Link>
  )
}
