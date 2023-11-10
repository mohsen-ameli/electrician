"use client"

import { login } from "./action"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Cookies from "universal-cookie"

const MAX_AGE = 60 * 60 * 24 * 1

export default function Admin() {
  const router = useRouter()

  async function handleForm(form: FormData) {
    const { error, jwt } = await login(form)
    if (error) {
      alert(error)
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
  }

  return (
    <div className="p-8 container">
      <h1 className="text-center text-2xl">
        If you are here, then it can only mean two things. You are the admin, or
        you are "trying" to become the admin. I hope you are the right person...
        Otherwise...
      </h1>

      <form action={handleForm} className="px-32 flex flex-col space-y-6 py-8">
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

        <Button type="submit">Login</Button>
      </form>
    </div>
  )
}
