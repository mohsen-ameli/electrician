import { Button } from "@/components/ui/button"
import { db } from "@/db/drizzle-db"
import { admin } from "@/db/schema"
import { compare } from "bcryptjs"
import { eq } from "drizzle-orm"
import { sign } from "jsonwebtoken"
import { redirect } from "next/navigation"

export default function Admin() {
  async function handleForm(form: FormData) {
    "use server"

    const username = form.get("username") as string
    const password = form.get("password") as string
    console.log("HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")

    let data: { error: string | null; jwt: string | null } = {
      error: "SOMETHING WENT WRONG",
      jwt: null,
    }
    let user:
      | {
          username: string
          password: string
          id: number
        }
      | undefined

    const MAX_AGE = 60 * 60 * 24 * 1 // 1 day

    try {
      user = await db.query.admin.findFirst({
        where: eq(admin.username, username),
      })
    } catch (error) {
      console.log("QUERRRRYY FAILEDDDDDDDDDDDDDDDd ", error)
    }

    if (!user) {
      data = {
        error: "Either username or password is incorrect",
        jwt: null,
      }
    } else {
      let valid = false
      try {
        valid = await compare(password, user.password)
      } catch (error) {
        console.log("VALID FAILEDDDDDDDDDDDDDDDd ", error)
      }
      if (!valid) {
        data = {
          error: "Either username or password is incorrect",
          jwt: null,
        }
      } else {
        let token = ""
        try {
          token = sign({ id: user.id, username }, process.env.JWT_SECRET_KEY!, {
            expiresIn: MAX_AGE,
          })
        } catch (error) {
          console.log("SIGN FAILEDDDDDDDDDDDDDDDd ", error)
        }

        if (!token) {
          console.log("TOKEN FAILEDDDDDDDDDDDDDDDd ")
        } else {
          data = { error: null, jwt: token }
        }
      }
    }

    console.log("DATAAAAAAAAAAAAAAAAAAAAAAAAAAa", data)

    if (!data.error) {
      redirect("/")
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

        <Button type="submit" variant="hover">
          Login
        </Button>
      </form>
    </div>
  )
}
