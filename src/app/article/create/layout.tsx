"use client"

import Loading from "@/components/loading"
import { isAuthenticated } from "@/lib/is-authenticated"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function layout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [auth, setAuth] = useState(false)

  useEffect(() => {
    async function auth() {
      const authenticated = await isAuthenticated()
      if (!authenticated) router.push("/blog")
      else setAuth(true)
    }
    auth()
  }, [])

  if (!auth) return <Loading className="py-32 text-lg" />
  return <>{children}</>
}
