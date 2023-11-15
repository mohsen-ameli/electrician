"use client"

import { Button } from "@/components/ui/button"

export default function Admin() {
  async function handleForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const username = e.currentTarget.username.value
    const password = e.currentTarget.password.value
    console.log("HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")

    const res = await fetch("/api/test2", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    })
    console.log("RES", res)
    const { error: err, jwt }: { error: string | null; jwt: string } =
      await res.json()
    console.log("ERR", err)
    console.log("JWT", jwt)
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

        <Button type="submit" variant="hover">
          Login
        </Button>
      </form>
    </div>
  )
}
