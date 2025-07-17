"use client"

import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Cookies from "universal-cookie"
import { login } from "@/lib/login"
import Header from "@/components/header"

const MAX_AGE = 60 * 60 * 24 * 1

export default function Admin() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  async function handleForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const username = e.currentTarget.username.value
    const password = e.currentTarget.password.value

    const { error, jwt } = await login(username, password)

    if (error) {
      toast({
        title: "Login Failed!",
        description: error,
      })
    } else {
      const cookies = new Cookies()
      cookies.set("jwt", jwt, {
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: MAX_AGE,
      })
      router.push("/article/blog")
    }

    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  return (
    <div className="container lg:p-8">
      <Header title="Admin Login" />

      <form
        onSubmit={handleForm}
        className="flex flex-col space-y-6 py-8 lg:px-32"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="username">
            Username <span className="text-red-500">*</span>
          </label>
          <input
            required
            type="text"
            name="username"
            id="username"
            className="rounded-md border-2 border-black p-2"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            required
            type="password"
            name="password"
            id="password"
            className="rounded-md border-2 border-black p-2"
          />
        </div>

        {loading ? (
          <Button disabled variant="hover">
            Logging in...
          </Button>
        ) : (
          <Button type="submit" variant="hover">
            Login
          </Button>
        )}
      </form>
    </div>
  )
}
