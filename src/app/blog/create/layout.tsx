"use client"

import { authenticate } from "@/lib/authenticate"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function layout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    async function auth() {
      const res = await authenticate()
      if (!res) router.push("/blog")
    }
    auth()
  }, [])

  return <>{children}</>
}
