"use client"

import Link from "next/link"
import React, { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { usePathname } from "next/navigation"

export default function Authed() {
  const [authed, setAuthed] = useState(false)
  const path = usePathname()

  async function getAuth() {
    const res = await fetch(process.env.NEXT_PUBLIC_HOST + "/api/auth")
    const data: boolean = await res.json()
    setAuthed(data)
  }

  useEffect(() => {
    getAuth()
  }, [path])

  if (!authed) return <></>

  return (
    <Link href="/blog/create">
      <Button
        variant="ghost"
        className="text-base text-black font-normal hover:scale-95 transition-all"
      >
        Create Blog
      </Button>
    </Link>
  )
}
