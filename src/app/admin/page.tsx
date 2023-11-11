"use client"

import { useToast } from "@/components/ui/use-toast"
import { login } from "./action"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Cookies from "universal-cookie"

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

    const { error: err, jwt } = await login(username, password)
    if (err) {
      toast({
        title: "Login Failed!",
        description: err,
      })
    } else {
      const cookies = new Cookies()
      cookies.set("jwt", jwt, {
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: MAX_AGE,
      })
      router.push("/blog")
    }

    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  return (
    <div className="p-8 container">
      <h1 className="text-center text-2xl">
        If you are here, then it can only mean two things. You are the admin, or
        you are "trying" to become the admin. I hope you are the right person...
        Otherwise...
      </h1>

      <form
        onSubmit={handleForm}
        className="px-32 flex flex-col space-y-6 py-8"
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
            className="border-2 border-black rounded-md p-2"
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
            className="border-2 border-black rounded-md p-2"
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
